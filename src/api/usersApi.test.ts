import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  CreateUserInput,
  UpdateUserInput,
} from './usersApi';
import { apiClient } from './apiClient';

jest.mock('./apiClient');

const mockedApiClient = apiClient as jest.Mock;

describe('usersApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getUsers calls apiClient with correct path', () => {
    getUsers();
    expect(mockedApiClient).toHaveBeenCalledWith('/users/');
  });

  it('createUser sends POST request with correct data', () => {
    const data: CreateUserInput = { name: 'Alice', email: 'alice@example.com' };
    createUser(data);
    expect(mockedApiClient).toHaveBeenCalledWith('/users/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  });

  it('updateUser sends PUT request with correct data and ID', () => {
    const data: UpdateUserInput = { name: 'Bob', email: 'bob@example.com' };
    updateUser('123', data);
    expect(mockedApiClient).toHaveBeenCalledWith('/users/123', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  });

  it('deleteUser sends DELETE request with correct ID', () => {
    deleteUser('456');
    expect(mockedApiClient).toHaveBeenCalledWith('/users/456', {
      method: 'DELETE',
    });
  });
});
