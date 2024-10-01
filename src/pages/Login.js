import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      const { token } = response.data;

      // Zapisz token w localStorage
      localStorage.setItem('token', token);

      // Przekieruj do panelu administracyjnego
      navigate('/dashboard');
    } catch (err) {
      setError('Niepoprawne dane logowania');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Logowanie</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Login"
            className="p-2 border border-gray-300 rounded w-full mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            className="p-2 border border-gray-300 rounded w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
