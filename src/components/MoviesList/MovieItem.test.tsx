import { render, screen } from '@testing-library/react';
import MovieItem from './MovieItem';
import { Movie } from '../../types';

describe('MovieItem', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through dream-sharing.',
    release_date: '2010-07-16',
    poster_path: 'https://image.tmdb.org/t/p/w500/sample-poster.jpg',
  };

  it('renders the movie title, overview, release date and image', () => {
    render(<MovieItem movie={mockMovie} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(
      screen.getByText('A thief who steals corporate secrets through dream-sharing.')
    ).toBeInTheDocument();
    expect(screen.getByText(/Release Date:/)).toHaveTextContent('Release Date: 2010-07-16');

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toBe(mockMovie.poster_path);
    expect(image.alt).toBe(mockMovie.title);
  });
});
