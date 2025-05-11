import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import AuthCallbackPage from './AuthCallbackPage';

beforeEach(() => {
  localStorage.clear();
});

test('should save token and redirect to home', async () => {
  const token = 'test-token';
  const refresh_token = 'refresh_token';

  render(
    <MemoryRouter initialEntries={[`/auth?token=${token}&refresh_token=${refresh_token}`]}>
      <Routes>
        <Route path="/auth" element={<AuthCallbackPage />} />
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(localStorage.getItem('access_token')).toBe(token);
  });

  await waitFor(() => {
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token);
  });
});

test('should redirect to login if token missing', async () => {
  render(
    <MemoryRouter initialEntries={['/auth']}>
      <Routes>
        <Route path="/auth" element={<AuthCallbackPage />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});
