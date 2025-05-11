import { render, screen, waitFor } from '@testing-library/react';
import MoviesList from './MoviesList';
import fetchMock from 'jest-fetch-mock';
import { Movie } from '../../types';

jest.mock('./MovieItem', () => ({ movie }: { movie: Movie }) => (
  <div data-testid="movie-item">{movie.title}</div>
));

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('MoviesList', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.setItem('access_token', 'fake-token');
  });

  it('should show loading state initially', () => {
    fetchMock.mockResponseOnce(() => new Promise(() => {}));
    render(<MoviesList />);
    expect(screen.getByText(/loading movies/i)).toBeInTheDocument();
  });

  it('should render movies after fetch', async () => {
    const movies: Movie[] = [
      { id: 1, title: 'Inception', overview: '', poster_path: '', release_date: '2025' },
      { id: 2, title: 'Interstellar', overview: '', poster_path: '', release_date: '2025' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(movies));

    render(<MoviesList />);

    await waitFor(() => {
      expect(screen.getAllByTestId('movie-item')).toHaveLength(2);
    });

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  it('should handle fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    render(<MoviesList />);

    await waitFor(() => {
      expect(screen.queryByText(/loading movies/i)).not.toBeInTheDocument();
    });
  });
});
