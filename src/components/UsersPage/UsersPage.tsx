import React, { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  User,
} from '../../api/usersApi';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: '', email: '', id: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateUser(form.id, {
          name: form.name,
          email: form.email,
        });
      } else {
        await createUser({
          name: form.name,
          email: form.email,
        });
      }
      setForm({ name: '', email: '', id: '' });
      setEditing(false);
      fetchUsers();
    } catch (err) {
      setError('Failed to save user');
    }
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow mt-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 border-gray-300 dark:border-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 border-gray-300 dark:border-gray-600"
          required
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
          {editing ? 'Update' : 'Create'}
        </button>
      </form>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="border p-4 rounded flex justify-between items-center border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            >
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:underline dark:text-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
