import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthCallbackPage from './AuthCallbackPage';

beforeEach(() => {
  localStorage.clear();
});

test('should save token and redirect to home', async () => {
  const token = 'test-token';

  render(
    <MemoryRouter initialEntries={[`/auth?token=${token}`]}>
      <Routes>
        <Route path="/auth" element={<AuthCallbackPage />} />
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(localStorage.getItem('access_token')).toBe(token);
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
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
