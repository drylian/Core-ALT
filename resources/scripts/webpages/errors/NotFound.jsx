import React from 'react';

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-600 mt-4">Ops! Página não encontrada.</p>
      <p className="text-lg text-gray-600 mt-2">
        A URL que você está procurando não existe ou foi movida para outro lugar.
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={handleGoBack}
      >
        Voltar
      </button>
    </div>
  );
};

export default NotFound;
