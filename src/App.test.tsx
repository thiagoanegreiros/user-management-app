import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import { useAuth } from './hooks/useAuth';
import fetchMock from 'jest-fetch-mock';

jest.mock('./hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

fetchMock.enableMocks();

describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

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

  it('shows welcome and logout button when logged in', async () => {
    const mockLogout = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      login: jest.fn(),
      logout: mockLogout,
    });

    fetchMock.mockResponseOnce(JSON.stringify([{
        id: 1,
        title: "string",
        poster_path: "",
        release_date: "string",
        overview: "string"
      }]), {
      headers: { 'Content-Type': 'application/json' }
    });


    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Espera até o texto "welcome" estar no DOM
    const welcomeText = await screen.findByText(/welcome, you are logged in/i);
    expect(welcomeText).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
