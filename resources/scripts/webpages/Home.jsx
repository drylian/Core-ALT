import { useStoreState } from 'easy-peasy';
import React from 'react';

const Home = () => {
  const Website = useStoreState(state => state.website.data);

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à Página Inicial</h1>
        <p className="text-lg">
          Esta é uma página inicial simples criada com React e Tailwind CSS.
        </p>
        {Website && Object.keys(data).map((key) => (
          <li key={key}>
            <strong>{key}:</strong> {data[key]}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Home;
