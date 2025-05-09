import React, { useEffect, useState } from 'react';
import { Movie } from './types';
import MovieItem from './MovieItem';

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/movies/popular', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch movies', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div>
      {movies && movies.length > 0 && movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
