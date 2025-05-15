import { apiClient } from './apiClient';
import { Movie } from '../types';

export const getPopularMovies = () => {
  return apiClient<Movie[]>('/movies/popular');
};

export const searchMovies = (query: string) => {
  return apiClient<Movie[]>(`/movies/search/${encodeURIComponent(query)}`);
};
