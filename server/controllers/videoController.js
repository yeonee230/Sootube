import { createError } from '../util/error';
import User from '../models/User';
import Video from '../models/Video';

export const addVideo = async (req, res, next) => {
  // console.log('upload video req.body: ', req.body);
  // console.log('upload video req.user: ', req.user);
  const newVideo = await Video({ ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  const userID = req.params.id;
  try {
    const video = await Video.findById(userID);
    if (!video) return next(createError(404, 'video not found!'));
    if (userID === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        userID,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, 'you can update only your video'));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  const userID = req.params.id;
  try {
    const video = await Video.findById(userID);
    if (!video) return next(createError(404, 'video not found!'));
    if (userID === video.userId) {
      await Video.findByIdAndDelete(userID);
      res.status(200).json('The video has been deleted!');
    } else {
      return next(createError(403, 'you can delete only your video'));
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json('the view has been increased');
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(',');
  const videoId = req.query.videoId;

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    // 중복 제거해야함. 자기자신 제거해야함.
    const filteredVideos = videos.filter(
      (video) => video._id.toString() !== videoId
    );
    res.status(200).json(filteredVideos);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;

  try {
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' },
    }).limit(40);
    res.status(200).json(videos);
  } catch (query) {
    next(error);
  }
};
