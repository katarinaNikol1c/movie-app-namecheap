import type { NextApiRequest, NextApiResponse } from 'next'

const IMAGES_BASE_PATH = "https://image.tmdb.org/t/p/w500/"

type Movie = {
    id: number,
    title: string,
    release_date: number,
    overview: string,
    poster_path: string,
    backdrop_path: string,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 
    if (req.method === 'GET') {
        try {
          const movies = require('./data.json');
          const moviesWithImagePath: Movie[] = movies.results.map((movie: any) => {
            return {
                ...movie,
                image_path: `${IMAGES_BASE_PATH}${movie.poster_path}`,
                backdrop_path: `${IMAGES_BASE_PATH}${movie.backdrop_path}`,
            };
          });
          res.status(200).json(moviesWithImagePath);
        } catch (error) {
          res.status(500).json({ error: `Unable to read file ${ __dirname}` });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}
