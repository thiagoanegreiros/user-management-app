import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MoviesList from './MoviesList';
import { Movie } from '../../types';
import * as api from '../../api/moviesApi';

jest.useFakeTimers();

// Mock MovieItem para simplificar render
jest.mock('./MovieItem', () => ({ movie }: { movie: Movie }) => (
  <div data-testid="movie-item">{movie.title}</div>
));

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  localStorage.setItem('access_token', 'fake-token');
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('MoviesList', () => {
  it('should show loading state initially', () => {
    jest.spyOn(api, 'getPopularMovies').mockImplementation(() => new Promise(() => {}));
    jest.spyOn(api, 'searchMovies').mockResolvedValue([]); // evita chamadas acidentais

    render(<MoviesList />);
    expect(screen.getByText(/loading movies/i)).toBeInTheDocument();
  });

  it('should render movies after fetch', async () => {
    const movies: Movie[] = [
      { id: 1, title: 'Inception', overview: '', poster_path: '', release_date: '2025' },
      { id: 2, title: 'Interstellar', overview: '', poster_path: '', release_date: '2025' },
    ];

    jest.spyOn(api, 'getPopularMovies').mockResolvedValue(movies);
    jest.spyOn(api, 'searchMovies').mockResolvedValue([]);

    render(<MoviesList />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });

    expect(screen.getAllByTestId('movie-item')).toHaveLength(2);
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });


  it('should handle fetch error', async () => {
    jest.spyOn(api, 'getPopularMovies').mockRejectedValue(new Error('Failed to fetch'));
    jest.spyOn(api, 'searchMovies').mockResolvedValue([]);

    render(<MoviesList />);

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
  });

  it('should call searchMovies when typing in input', async () => {
    const mockSearch = jest.spyOn(api, 'searchMovies').mockResolvedValue([
      {
        id: 1,
        title: 'Test Movie',
        release_date: '2025-01-01',
        poster_path: '',
        overview: '',
      },
    ]);
    jest.spyOn(api, 'getPopularMovies').mockResolvedValue([]);

    render(<MoviesList />);

    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'test' } });

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('test');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });
  });
});
