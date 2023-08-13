import React, { useState } from 'react';
import http from '../../api/http';
import { useStoreActions } from 'easy-peasy';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Variável de estado para armazenar a mensagem de erro
  const login = useStoreActions((actions) => actions.login);
  const setAdmin = useStoreActions((actions) => actions.setAdmin);

  const handleLogin = async () => {
    try {
      const response = await http.post('/login', { username, password });
      const { isAdmin } = response.data;
      login(); // Define isLoggedIn como true
      setAdmin(isAdmin); // Define isAdmin com base na resposta da API
      setErrorMessage(''); // Limpa a mensagem de erro em caso de login bem-sucedido
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Define a mensagem de erro recebida da API
      } else {
        setErrorMessage('Erro de autenticação'); // Mensagem de erro padrão caso não haja mensagem específica
      }
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Exibe a mensagem de erro, se houver */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
