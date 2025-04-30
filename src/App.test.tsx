import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';

jest.mock('./hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from './hooks/useAuth';

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to /login when not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: false,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  });

  it('shows welcome and logout button when logged in', () => {
    const mockLogout = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      login: jest.fn(),
      logout: mockLogout,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome, you are logged in/i)).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
