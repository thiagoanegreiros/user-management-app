import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UsersPage } from './UsersPage';
import * as usersApi from '../../api/usersApi';

jest.mock('../../api/usersApi');

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

describe('UsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays users on mount', async () => {
    (usersApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);

    render(<UsersPage />);

    expect(screen.getByText(/Loading users/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('displays error message if fetch fails', async () => {
    (usersApi.getUsers as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    render(<UsersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch users/i)).toBeInTheDocument();
    });
  });

  it('submits new user on form submit', async () => {
    (usersApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (usersApi.createUser as jest.Mock).mockResolvedValue({});
    
    render(<UsersPage />);

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'alice@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Create/i }));

    await waitFor(() => {
      expect(usersApi.createUser).toHaveBeenCalledWith({
        name: 'Alice',
        email: 'alice@example.com',
      });
    });
  });

  it('handles edit and update flow', async () => {
    (usersApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (usersApi.updateUser as jest.Mock).mockResolvedValue({});

    render(<UsersPage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/Edit/i)[0]);

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'John Updated' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(usersApi.updateUser).toHaveBeenCalledWith('1', {
        name: 'John Updated',
        email: 'john@example.com',
      });
    });
  });

  it('deletes a user when Delete is clicked', async () => {
    (usersApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (usersApi.deleteUser as jest.Mock).mockResolvedValue({});

    render(<UsersPage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/Delete/i)[0]);

    await waitFor(() => {
      expect(usersApi.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});

it('shows error when user creation fails', async () => {
  (usersApi.getUsers as jest.Mock).mockResolvedValue([]);
  (usersApi.createUser as jest.Mock).mockRejectedValue(new Error('Create failed'));

  render(<UsersPage />);

  fireEvent.change(screen.getByPlaceholderText(/Name/i), {
    target: { value: 'Error User' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'error@example.com' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Create/i }));

  await waitFor(() => {
    expect(screen.getByText(/Failed to save user/i)).toBeInTheDocument();
  });
});

it('shows error when deleting a user fails', async () => {
  (usersApi.getUsers as jest.Mock).mockResolvedValue(mockUsers);
  (usersApi.deleteUser as jest.Mock).mockRejectedValue(new Error('Delete failed'));

  render(<UsersPage />);

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByText(/Delete/i)[0]);

  await waitFor(() => {
    expect(screen.getByText(/Failed to delete user/i)).toBeInTheDocument();
  });
});
