import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LoginPage from './LoginPage';

Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    href: '',
    origin: 'http://localhost',
  },
});

test('clicking login button sets window.location.href to login URL', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: /login with google/i }));

  expect(window.location.href).toContain(
    'https://python-studies.onrender.com/login?redirect_uri=http%3A%2F%2Flocalhost%2Fauth'
  );
});
