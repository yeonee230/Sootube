import jwt from "jsonwebtoken";
import { createError } from "./error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(createError(401, "You are not authenticated!"));

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     next()
//   });
// };

export const verifyToken = (req, res, next) => {

  console.log('req headers in verifyToken',req.headers);
  
  console.log('token in verifyToken : ',req.headers.authorization );
  
  if(!req.headers.authorization) return res.status(403).json({msg: "Not authorized. No token"})

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
         if(err) return res.status(403).json({msg: "Wrong or expired token"})
         else {
            req.user = data // data = {id: newUser._id}
            next()
         }
      })
  }
}



// import jwt from 'jsonwebtoken';
// import { createError } from './error';


// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log('req.cookies. :: ', req.cookies);
//   console.log('token :: ', token);

//   //if (!token) return next(createError(401, 'you are not authenticated!'));

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) return next(createError(403, 'Token is not valid!'));
//       req.user = user;
//       next();
//     });
//   } else {
//     return next(createError(401, 'you are not authenticated!'));
//   }
// };
