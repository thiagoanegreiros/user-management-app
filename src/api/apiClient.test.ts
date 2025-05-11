import { apiClient } from './apiClient';

beforeEach(() => {
  fetchMock.resetMocks();
  localStorage.clear();
});

describe('apiClient', () => {
  it('returns data on success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'success' }));

    localStorage.setItem('access_token', 'valid_token');

    const result = await apiClient<{ message: string }>('/test');

    expect(result.message).toBe('success');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer valid_token',
        }),
      })
    );
  });

  it('retries after 401 with refresh success', async () => {
    localStorage.setItem('access_token', 'old_token');
    localStorage.setItem('refresh_token', 'refresh_ok');

    fetchMock.mockResponses(
      [JSON.stringify({}), { status: 401 }],
      [JSON.stringify({ access_token: 'new_token' }), { status: 200 }],
      [JSON.stringify({ message: 'retried' }), { status: 200 }]
    );

    const result = await apiClient<{ message: string }>('/protected');

    expect(result.message).toBe('retried');
    expect(localStorage.getItem('access_token')).toBe('new_token');
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('throws if refresh token fails', async () => {
    localStorage.setItem('access_token', 'old_token');
    localStorage.setItem('refresh_token', 'expired');

    fetchMock.mockResponses(
      ['', { status: 401 }],
      ['', { status: 403 }]
    );

    await expect(apiClient('/protected')).rejects.toThrow('Unauthorized');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('throws if refresh token is missing', async () => {
    localStorage.setItem('access_token', 'old_token');
    localStorage.removeItem('refresh_token');

    fetchMock.mockResponseOnce('', { status: 401 });

    await expect(apiClient('/protected')).rejects.toThrow('Unauthorized');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('throws if status is not ok and not 401', async () => {
    localStorage.setItem('access_token', 'any_token');

    fetchMock.mockResponseOnce('', { status: 403, statusText: 'Forbidden' });

    await expect(apiClient('/protected')).rejects.toThrow('Error 403: Forbidden');
  });

  it('handles error in refresh request gracefully', async () => {
    localStorage.setItem('access_token', 'old_token');
    localStorage.setItem('refresh_token', 'refresh');

    fetchMock.mockResponses(
      ['', { status: 401 }],
      () => Promise.reject(new Error('Network error'))
    );

    await expect(apiClient('/protected')).rejects.toThrow('Unauthorized');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
