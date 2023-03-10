import { NextApiRequest, NextApiResponse } from 'next';
import data from './data.json';

const IMAGES_BASE_PATH = "https://image.tmdb.org/t/p/w500/";

export default function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
  
  const { name } = req.query;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid name parameter' });
  }

  const filteredMovies = data.results.filter(movie =>
    movie.original_title.toLowerCase().includes(name.toLowerCase())
  );

  const newMovieList = filteredMovies.map((movie: any) => {
    return {
        ...movie,
        image_path: `${IMAGES_BASE_PATH}${movie.poster_path}`,
        backdrop_path: `${IMAGES_BASE_PATH}${movie.backdrop_path}`,
    };
  });

  res.json(newMovieList)
}