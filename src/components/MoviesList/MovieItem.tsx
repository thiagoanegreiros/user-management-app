import React from 'react';
import { Movie } from '../../types';

interface Props {
  movie: Movie;
}

const MovieItem: React.FC<Props> = ({ movie }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 max-w-4xl mx-auto p-4 border-b border-gray-200">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="w-32 h-48 object-cover rounded shadow-md"
      />
      <div className="text-center sm:text-left">
        <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
        <p className="text-gray-700 text-sm mb-2">{movie.overview}</p>
        <small className="text-gray-500 block">
          Release Date: {movie.release_date}
        </small>
      </div>
    </div>
  );
};

export default MovieItem;
