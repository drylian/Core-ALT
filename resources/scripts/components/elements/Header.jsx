// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import useConfig from '../../contexts/hooks/useConfig.jsx';

const Header = () => {
    const { website } = useConfig();
  return (
<header className="bg-black text-white p-4 flex justify-between items-center fixed w-full top-0">
      <div className="text-xl font-bold">{!website ? "Core" : website.title}</div>
      <div className="flex items-center space-x-4">
        <Link
          to="/status"
          className="transition duration-300 hover:text-blue-200"
        >
          Status
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to="/auth/login"
          className="transition duration-300 hover:text-blue-200"
        >
          Fazer login
        </Link>
      </div>
    </header>
  );
};

export default Header;
