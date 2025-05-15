import { getPopularMovies, searchMovies } from './moviesApi';
import { apiClient } from './apiClient';
import { Movie } from '../types';

jest.mock('./apiClient');
const mockedApiClient = apiClient as jest.MockedFunction<typeof apiClient>;

describe('moviesApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call /movies/popular in getPopularMovies', async () => {
    const fakeResponse: Movie[] = [{ id: 1, title: 'Test Movie', overview: '', poster_path: '', release_date: '2025' }];
    mockedApiClient.mockResolvedValue(fakeResponse);

    const result = await getPopularMovies();

    expect(mockedApiClient).toHaveBeenCalledWith('/movies/popular');
    expect(result).toEqual(fakeResponse);
  });

  it('should call /movies/search/{query} in searchMovies', async () => {
    const query = 'avatar 2';
    const fakeResponse: Movie[] = [{ id: 2, title: 'Avatar 2', overview: '', poster_path: '', release_date: '2025' }];
    mockedApiClient.mockResolvedValue(fakeResponse);

    const result = await searchMovies(query);

    expect(mockedApiClient).toHaveBeenCalledWith('/movies/search/avatar%202');
    expect(result).toEqual(fakeResponse);
  });
});
