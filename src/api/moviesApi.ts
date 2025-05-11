import { apiClient } from './apiClient';
import { Movie } from '../types';

export const getPopularMovies = () => {
  return apiClient<Movie[]>('/movies/popular');
};
