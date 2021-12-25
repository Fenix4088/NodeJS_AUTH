import dotenv from 'dotenv';
import express from 'express';
import authRouter from './src/routers/auth.router';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';

dotenv.config();

const PORT: number = (process.env.PORT && +process.env.PORT) || 5000;
const DB: string = `mongodb+srv://fenix:${process.env.PASS}@cluster0.xfxfh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(express.static('static'));
app.use(express.json());
app.use(fileupload({}))

app.use('/api', authRouter);

const startApp = async () => {
  try {
    mongoose.connect(`${DB}`, (err) => {
      if (err) throw new Error(err.message);

      console.log('Conected to db');
    });

    app.listen(PORT, () => {
      console.log(`App started on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startApp();
