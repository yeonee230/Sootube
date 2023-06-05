import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next()
  });
};



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
