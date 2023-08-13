import React from 'react';

function ClientTeste() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-600 mt-4">Página não encsssssssontrsssssssada</p>
      <img
        src="https://via.placeholder.com/300"
        alt="404 Not Found"
        className="mt-8"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8">
        Voltar para a página inicial
      </button>
    </div>
  );
}


export default ClientTeste;
