import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getGenres, getUpcomingMovies } from '../tmdb-api.js';




const router = express.Router();

console.log("MOVIES ROUTER LOADED");

router.get('/test', (req, res) => {
  res.status(200).json({ status: "movies router reachable" });
});


router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));


//Get genres
router.get('/genre', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  const upcoming = await getUpcomingMovies();
  res.status(200).json(upcoming);
}));


export default router;
