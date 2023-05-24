import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouters from './routers/users';
import videoRouters from './routers/videos';
import commentRouters from './routers/comments';
import authRouters from './routers/auth';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8800;
dotenv.config();

const connect = () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('✅ Connected to DB');
    })
    .catch((err) => {
      throw err;
    });
};
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouters);
app.use('/api/users', userRouters);
app.use('/api/videos', videoRouters);
app.use('/api/comments', commentRouters);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error 500';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  connect();
  console.log('✅ Connected to Server!');
});
