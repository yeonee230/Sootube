import express from 'express';
import { googleAuth, signin, signup, logout } from '../controllers/authController';

const router = express.Router();

// sign up 
router.post('/signup', signup);

// sign in
router.post('/signin', signin);

//google auth
router.post('/google',googleAuth);

//logout
router.post('/logout', logout)

export default router;
