import jwt from 'jsonwebtoken';


function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } 
  return null;
}
const isTokenExpired = (token) => (Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000);
const authenticateJWT = (req, res, next) => {

  const {token} = req.body.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(isTokenExpired(token)) {
      return res.status(401).json({ message: 'Jwt Expired' });
    }
    else if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    const obj = JSON.stringify(req.body);
    const obj2 = JSON.parse(obj);
    req.data = obj2.data;
    next();
  });
};
const authenticateJWTGet = (req, res, next) => {
  let t = getToken(req);
  let {token} = JSON.parse(t);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(isTokenExpired(token)) {
      return res.status(401).json({ message: 'Jwt Expired' });
    }
    else if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}


export { authenticateJWT,  authenticateJWTGet};
