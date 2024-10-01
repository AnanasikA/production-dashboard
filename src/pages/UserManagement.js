import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });

  // Pobierz użytkowników z backendu
  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:4000/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers(); // Załaduj użytkowników po załadowaniu komponentu
  }, []);

  // Dodaj nowego użytkownika
  const handleAddUser = async () => {
    await axios.post('http://localhost:4000/users', newUser);
    setNewUser({ username: '', password: '', role: '' }); // Zresetuj formularz
    fetchUsers(); // Odśwież listę użytkowników
  };

  // Usuń użytkownika
  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    fetchUsers(); // Odśwież listę użytkowników po usunięciu
  };

  // Zaktualizuj rolę użytkownika
  const handleRoleChange = async (id, newRole) => {
    await axios.put(`http://localhost:4000/users/${id}`, { role: newRole });
    fetchUsers(); // Odśwież listę użytkowników po zmianie roli
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Zarządzanie użytkownikami</h1>

      {/* Formularz dodawania nowego użytkownika */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Dodaj nowego użytkownika</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Login"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Rola (admin, manager, user)"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button 
          onClick={handleAddUser} 
          className="bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 transition-colors"
        >
          Dodaj użytkownika
        </button>
      </div>

      {/* Lista użytkowników */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Login</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Rola</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-600">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-3 text-gray-800">{user.username}</td>
                <td className="p-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;


