import express from 'express';
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from '../controllers/userController';
import { verifyToken } from '../util/verifyToken';

const router = express.Router();

//update user
router.put('/:id', verifyToken, update);
//del user
router.delete('/:id', verifyToken, deleteUser);
//get user
router.get('/find/:id', getUser);
//subscribe user
router.put('/sub/:id', verifyToken, subscribe);
//unsubscribe user
router.put('/unsub/:id', verifyToken, unsubscribe);
//like a video
router.put('/like/:videoId', verifyToken, like);
//dislike a video
router.put('/dislike/:videoId', verifyToken, dislike);


export default router;
