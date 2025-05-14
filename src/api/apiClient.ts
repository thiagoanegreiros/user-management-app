export const apiClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    }
  });

  if (res.status === 401) {
    const success = await tryRefreshToken();
    if (success) {
      return apiClient<T>(endpoint, options);
    } else {
      throw new Error('Unauthorized');
    }
  }

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

const tryRefreshToken = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) return false;

    const { access_token } = await res.json();
    localStorage.setItem('access_token', access_token);
    return true;
  } catch {
    return false;
  }
};
