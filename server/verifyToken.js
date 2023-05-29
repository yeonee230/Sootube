import jwt from 'jsonwebtoken';
import { createError } from './error';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token :: ",token)
  console.log("process.env.JWT :: ",process.env.JWT)
  console.log("user :: ",user)

  if (!token) return next(createError(401, 'you are not authenticated!'));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};
