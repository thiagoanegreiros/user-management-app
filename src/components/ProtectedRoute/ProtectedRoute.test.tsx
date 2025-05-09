import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProtectedRoute from './ProtectedRoute';

import { useAuth } from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn()
}));

const DummyComponent = () => <div>Protected Content</div>;

describe('ProtectedRoute', () => {
  it('renders loading when isLoading is true', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoading: true, isLoggedIn: false });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <DummyComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders children when user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoading: false, isLoggedIn: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <DummyComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /login when user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ isLoading: false, isLoggedIn: false });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute>
          <DummyComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
