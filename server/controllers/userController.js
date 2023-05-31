import mongoose from 'mongoose';
import User from '../models/User';
import Video from '../models/Video';
import { createError } from '../error';

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can update only your account!'));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('user has been deleted;');
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, 'You can delete only your account!'));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      // 내 아이디
      $push: { subscribedUsers: id }, // 다른 사람 채널 아이디
    });
    await User.findByIdAndUpdate(id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json('subscription success');
  } catch (error) {
    next(error);
  }
};
export const unsubscribe = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      // 내 아이디
      $pull: { subscribedUsers: id }, // 다른 사람 채널 아이디
    });
    await User.findByIdAndUpdate(id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json('unsubscription success');
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json('video get dislike!!');
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json('video get dislike!!');
  } catch (error) {
    next(error);
  }
};



