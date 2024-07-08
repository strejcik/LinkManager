import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import Link from '../models/links.js';
import { authenticateJWT, authenticateJWTGet } from '../middlewares/authMiddleware.js';
import { nanoid } from 'nanoid';
import { registerValidation, handleRegisterValidationErrors } from '../middlewares/registerMiddleware.js';
import { loginValidation, handleLoginValidationErrors } from '../middlewares/loginMiddleware.js';
import { addLinkValidation, handleAddLinkValidationErrors } from '../middlewares/addLinkMiddleware.js';
import { editLinkValidation, handleEditLinkValidationErrors } from '../middlewares/editLinkMiddleware.js';
import formatLink from '../utils/formatLink.js';
const router = express.Router();


// User Registration

router.post('/register',registerValidation, handleRegisterValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }); // Changed variable name to existingUser
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Internal server error' });
  }
});

// User Login

router.post('/login', loginValidation, handleLoginValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, email });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Internal server error' });
  }
});


//Protected route 




router.post('/addlink', [authenticateJWT, addLinkValidation], handleAddLinkValidationErrors ,  async (req, res) => {
  const { data } = req.body;
  const dataObj = data.links.reduce((acc,curr)=> (acc[curr]='',acc),{});
  try {
    User.findOne({ email: req.user.email }).then(async (user, err) => {
      if(user){
            for (var key in dataObj) {
              if (dataObj.hasOwnProperty(key)) {
                dataObj[key] = nanoid(11);

                const link =  await Link.create({
                  originalLink: formatLink(key),
                  shortenedLink: dataObj[key],
                  category: data.category,
                  description: data.description,
                  allowedips: data.allowedips,
                  user: user._id
                });
                user.links = [...user.links, link];

              }
            }
            user.save();
            return res.status(200).json({ message: 'Added link' });
      }
  });
  }catch (error) {
    console.error(error);
    res.json({ message: 'Internal server error' });
  }
});




router.post('/editlink', [authenticateJWT, editLinkValidation], handleEditLinkValidationErrors, (req, res) => {
  const { user, data, id } = req.body;
  data.originalLink = formatLink(data.originalLink);


  Link.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true },
    (err, doc) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.status(200).json({ message: 'Editted link' });
    }
  );


});




router.post('/deletelink', [authenticateJWT], (req, res) => {
  const { data } = req.body;
  const user = req.user;
  var shortLink;
  Link.findOne({_id: data }).then(linkdoc => {
    shortLink = linkdoc.shortenedLink;


    Link.findOneAndRemove({_id: data }, 
      function (err, docs) { 
      if (err){ 
        console.error(err);
        return res.json({ message: 'Could not remove link' });
      } 
      else{
  
      User.findOne({email: user.email})
      .populate({
        path:"views",
        model:"Views"
      })
      .exec(function (err, doc) {
        if (err){ 
          console.error(err);
          return res.json({ message: 'Could not remove link' });
        } 
        else {
          let tempLinks;
          let tempViews;
          tempLinks = doc.links.filter((e) => e.toString() !== data);
          tempViews = doc.views.filter((e) => e.shortenedLink !== shortLink)
          doc.links = [...tempLinks];
          doc.views = [...tempViews];
          doc.save();
          return res.status(200).json({ message: 'Removed link' });
        }
      });
        
      } 
      }); 


  }).catch(error => {
    return res.status(500).json(error);
});;
});





router.get('/getlinks', authenticateJWTGet,  async (req, res) => {
  let user = req.user.email;
  
  try {

    await User.findOne({email: user})
    .populate({
      path:"links",
      model:"Link"
    })
    .exec(function (err, data) {
      let responseData = [];
      let linkObj;
      data.links.forEach((e, i) => {
          linkObj = {
            id: e._id.toString(),
            originalLink: e.originalLink,
            shortenedLink: e.shortenedLink,
            category: e.category,
            description: e.description,
            allowedips: [...e.allowedips]
          }
          responseData.push(linkObj);
      });
      return res.status(200).json(responseData);
    });

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});









router.get('/getlink/:id', authenticateJWTGet,  async (req, res) => {
  let user = req.user.email;
  let id = req.params.id;
  try {

    await User.findOne({email: user})
    .populate({
      path:"links",
      model:"Link"
    })
    .exec(function (err, data) {
      let responseData = [];
      let linkObj;
      data.links.forEach((e, i) => {
        if(e._id.toString() === id) {
          linkObj = {
            id: e._id.toString(),
            originalLink: e.originalLink,
            shortenedLink: e.shortenedLink,
            category: e.category,
            description: e.description,
            allowedips: [...e.allowedips]
          }
          responseData.push(linkObj);
        }
      });
      //res.status(500).json({ message: 'Link not found.' });
      return res.status(200).json(responseData);
    });

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});













router.get('/getlinkviews', authenticateJWTGet, async (req, res) => {
  let user = req.user.email;
  var responseData = [];


  try {
    await User.findOne({email: user})
    .populate({
      path:"views",
      model:"Views"
    })
    .exec(function (err, data) {
  
      return res.status(200).json(data.views);
    });
  }catch(err) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }



});






export default router;

