import React, { useEffect, useState } from 'react';
import { Movie } from '../../types';
import MovieItem from './MovieItem';
import { getPopularMovies } from '../../api/moviesApi';

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularMovies()
      .then(data => {
        setMovies(data);
        setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch movies', err);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading movies...</p>;

  return (
    <div className="mt-10">
      {movies.length > 0 ? (
        movies.map(movie => <MovieItem key={movie.id} movie={movie} />)
      ) : (
        <p className="text-center text-gray-500">No movies found.</p>
      )}
    </div>
  );
};

export default MoviesList;
