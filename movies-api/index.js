import dotenv from 'dotenv';
import express from 'express';
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import mongoose from 'mongoose';
import authenticate from './authenticate';

// other imports
import cors from 'cors';


dotenv.config();

// --- MONGOOSE CONNECTION ---
(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/db');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};



const app = express();

// Enable CORS for all requests
app.use(cors());



const port = process.env.PORT || 8080;

app.use(express.json());

// Serve static files from the public folder (so GET / will return public/index.html)
app.use(express.static('public'));

app.use('/api/users', usersRouter);

app.use('/api/movies', authenticate, moviesRouter);


app.use(errHandler);


app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
