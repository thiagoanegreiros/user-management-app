import React, { useEffect, useState, useCallback } from 'react';
import { Movie } from '../../types';
import MovieItem from './MovieItem';
import { getPopularMovies, searchMovies } from '../../api/moviesApi';

let debounceTimer: ReturnType<typeof setTimeout>;

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const fetchMovies = useCallback(async (search: string) => {
    setLoading(true);
    try {
      const data = search
        ? await searchMovies(search)
        : await getPopularMovies();
      setMovies(data);
    } catch (err) {
      console.error('Failed to fetch movies', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchMovies(query.trim());
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [query, fetchMovies]);

  return (
    <div className="mt-10">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white mb-6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : movies.length > 0 ? (
        movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
      ) : (
        <p className="text-center text-gray-500">No movies found.</p>
      )}
    </div>
  );
};

export default MoviesList;
