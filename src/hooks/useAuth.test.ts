import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

beforeEach(() => {
  localStorage.clear();
});

describe('useAuth', () => {
  test('should be logged out by default if no token exists', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoggedIn).toBe(false);
  });

  test('should be logged in if token exists in localStorage', () => {
    localStorage.setItem('access_token', 'test-token');
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoggedIn).toBe(true);
  });

  test('login() should store token and set isLoggedIn to true', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login('new-token', 'refresh-token');
    });

    expect(localStorage.getItem('access_token')).toBe('new-token');
    expect(result.current.isLoggedIn).toBe(true);
  });

  test('logout() should remove token and set isLoggedIn to false', () => {
    localStorage.setItem('access_token', 'test-token');
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });
});
