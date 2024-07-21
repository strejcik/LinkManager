import express from 'express';
import cors from 'cors';
import userRoutes from './server/routes/userRoutes.js';
import dotenv from 'dotenv';
import connectDB from './server/utils/connect-mongo.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import Link from './server/models/links.js';
import Views from './server/models/views.js';
import User from './server/models/users.js';
import mongoose from 'mongoose';
import requestIp from 'request-ip';
import cluster from 'cluster';
import os from 'os';




if(cluster.isMaster) {
	var numWorkers = os.cpus().length;

	console.log('Master cluster setting up ' + numWorkers + ' workers...');

	for(var i = 0; i < numWorkers; i++) {
		cluster.fork();
	}

	cluster.on('online', function(worker) {
		console.log('Worker ' + worker.process.pid + ' is online');
	});

	cluster.on('exit', function(worker, code, signal) {
		console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		console.log('Starting a new worker');
		cluster.fork();
	});
} else {
  dotenv.config();

  const PORT = process.env.PORT || 5000;
  const app = express();
  //const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
  // Middleware

  const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(requestIp.mw());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  //app.use(express.static(path.join(__dirname, '/../client/build')));
  
  
  
  
  
  // Routes
  app.use('/api', userRoutes);
  
  app.get('/l/*', async (req,res) => {
    let subUrl = req.path.substring(0,3);
  
  
    const clientIp = req.clientIp;
  
    if(subUrl === "/l/") {
      let shortLink = req.path.substring(3,);
        try {
          let links = await Link.find({});
          links.forEach((link) => {
  
            if(link.shortenedLink === shortLink){
              if(link.allowedips.length === 0) {
  
  
                let viewId = new mongoose.Types.ObjectId();
                
                Views.create({
                  _id: viewId,
                  ip: clientIp,
                  link: link._id,
                  originalLink: link.originalLink,
                  shortenedLink: link.shortenedLink,
                  user: link.user
                });
                
                User.findOneAndUpdate(
                  { _id: link.user },
                  { $push: { views: viewId } },
                  { new: true },
                  (err, l) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    //console.log(l);
                  }
                );
  
                res.status(301).redirect(link.originalLink);
  
              } else {
                link.allowedips.forEach((allowedIp) => {
                  if(allowedIp === clientIp) {
                    res.status(301).redirect(link.originalLink);
                  } else {
                    console.log(clientIp + ' tried to connect. Access denied');
                  }
                });
              }
            }
          });
         }catch(error) {
           console.log(error);
           console.log('Error redirect');
         }
    }
   });
  
  // app.get('*', async (req, res) => {
  //   res.sendFile(path.join(__dirname + '/../client/build/index.html'));
  // });
  
  
  
  // MongoDB Connection
  connectDB();

  app.listen(PORT, () => {
    console.log(`Worker process ${process.pid} is listening on port ${PORT}`);
  });
}