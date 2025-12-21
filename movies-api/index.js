import dotenv from 'dotenv';
import express from 'express';
import usersRouter from "./api/users/index.js";
import moviesRouter from './api/movies';
import authenticate from './authenticate';
import connectDB from "./db/index.js";



// other imports
import cors from 'cors';


dotenv.config();

const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};



const app = express();

// Enable CORS for all requests
app.use(cors());



const port = process.env.PORT || 8080;

await connectDB();

app.use(express.json());

app.use(express.static());

app.use('/api/users', usersRouter);

app.use('/api/movies', moviesRouter);


app.use(errHandler);


app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
