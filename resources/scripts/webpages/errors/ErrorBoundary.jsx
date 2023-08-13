import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode registrar o erro aqui ou enviá-lo para um serviço de rastreamento de erros
    console.error('Erro capturado:', error, errorInfo);
  }

  handleGoBack() {
    window.history.back();
  }

  render() {
    if (this.state.hasError) {
      // Estilo de página inteira usando Tailwind CSS
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-6xl font-bold text-red-600">500</h1>
          <p className="text-xl text-gray-600 mt-4">Ops! Ocorreu um erro ao carregar a pagina.</p>
          <p className="text-lg text-gray-600 mt-2">
            Ocorreu um erro ao tentar carregar a pagina, tente novamente mais tarde.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={this.handleGoBack.bind(this)}
          >
            Voltar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
