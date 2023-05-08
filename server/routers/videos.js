import express from 'express'
import {addVideo, addView, deleteVideo, getByTags, getVideo, random, search, sub, trend, updateVideo  } from '../controllers/videoController';
import { verifyToken } from '../verifyToken';

const router = express.Router();

//create video
router.post('/', verifyToken, addVideo)
//update video
router.put('/:id', verifyToken, updateVideo)
//delete video
router.delete('/:id', verifyToken, deleteVideo)
//get video
router.get('/find/:id', getVideo)

//view update
router.put("/view/:id", addView)
//get trend
router.get('/trend', trend)
//get random
router.get('/random', random)
//sub
router.get('/sub',verifyToken, sub)
//tags
router.get('/tags', getByTags)
//search
router.get('/search', search)
export default router;