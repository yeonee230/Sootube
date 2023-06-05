import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { createError } from '../util/error';
import jwt from 'jsonwebtoken';
import generateToken from '../util/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res, next) => {
  const { email } = req.body;

  //email 중복 검사 
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('The email already exists');
  }

  try {

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);
    // const newUser = new User({ ...req.body, password: hash });

    const newUser = new User({ ...req.body });
    await newUser.save();
    res.status(200).send("User has been created!");


  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    console.log('email 확인 : ',req.body)
    const { email, password: dbPw } = req.body;
   
    const user = await User.findOne({ email});
    if (!user) return next(createError(404, "email이 존재하지 않습니다. "));

    const isCorrect = await bcrypt.compare(dbPw, user.password);

    if (!isCorrect) return next(createError(400, "비밀번호가 일치하지 않습니다."));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others, token );
  } catch (err) {
    next(err);
  }
};


// @desc    Auth user & get token
// @route   POST /api/auth/signin
// @access  Public
export const signin2 = async (req, res, next) => {
  const { email, password: dbPw } = req.body;
  try {
    //find user
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, 'User Not Found !'));

    //match pw
    const isCorrect = await bcrypt.compare(dbPw, user.password);
    if (!isCorrect) return next(createError(400, 'Wrong Credentials! '));

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;

    //make JWT token
    generateToken(res, user._id);
    
    res.status(200).json(others);

    // res
    //   .cookie('access_token', token, {
    //     maxAge: 1000*60*60*24*7,
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json(others);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, name, img } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      //구글로 로그인했는데 처음으로 로그인함.
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save(); //디비에 저장하고
      //jwt 준다.
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (error) {
    next(err);
  }
};

// @desc     Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logout = async (req, res, next) => {
  res.cookie('access_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
