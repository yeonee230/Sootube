import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { createError } from '../error';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send('success : user create');
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { name, password: dbPw } = req.body;
  try {
    //find user
    const user = await User.findOne({ name });
    if (!user) return next(createError(404, 'User Not Found !'));

    //match pw
    const isCorrect = await bcrypt.compare(dbPw, user.password);
    if (!isCorrect) return next(createError(400, 'Wrong Credentials! '));
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
