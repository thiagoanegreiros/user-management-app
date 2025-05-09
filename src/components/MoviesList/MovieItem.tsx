import React from 'react';
import { Movie } from './types';

interface Props {
  movie: Movie;
}

const MovieItem: React.FC<Props> = ({ movie }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '1.5rem', gap: '1rem' }}>
      <img
        src={movie.poster_path}
        alt={movie.title}
        style={{ width: '120px', height: '180px', objectFit: 'cover' }}
      />
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        <small>Release Date: {movie.release_date}</small>
      </div>
    </div>
  );
};

export default MovieItem;
