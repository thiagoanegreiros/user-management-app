import { apiClient } from './apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface UpdateUserInput {
  name: string;
  email: string;
}

export const getUsers = () => {
  return apiClient<User[]>('/users/');
};

export const createUser = (data: CreateUserInput) => {
  return apiClient<User>('/users/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateUser = (id: string, data: UpdateUserInput) => {
  return apiClient<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteUser = (id: string) => {
  return apiClient<void>(`/users/${id}`, {
    method: 'DELETE',
  });
};
