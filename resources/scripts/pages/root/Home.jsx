// src/components/Home.js
import React from 'react';
import Header from '../../components/elements/Header.jsx';
import ContentBox from '../../components/ContentBox.jsx';
const Home = () => {
  return (
    <>
      <ContentBox title="Bem vindo a Nosso site">
        <Header />
        <div className="bg-gray-500 h-screen flex flex-col justify-center items-center">
          <header className="text-white text-center mb-8">
            <h1 className="text-4xl font-bold">Bem-vindo à Página Inicial</h1>
            <p className="text-lg">Esta é uma página inicial simples criada com React e Tailwind CSS.</p>
          </header>
          <section className="text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Recursos Adicionais</h2>
            <p className="text-lg">Adicione mais conteúdo aqui para testar e personalizar sua aplicação.</p>
          </section>
        </div>
      </ContentBox>
    </>
  );
};

export default Home;
