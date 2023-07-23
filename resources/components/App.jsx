import { Outlet } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy';
import { store } from '../states';
import { useEffect } from 'react';
import axios from 'axios';

function getCsrfToken() {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split('=');
    if (cookieName === 'XSRF-TOKEN') {
      return decodeURIComponent(cookieValue);
    }
  }
  return '';
}

function App() {
  /**
   * TOKEN XSRF
   */
  useEffect(() => {
    axios.defaults.headers.common['X-XSRF-TOKEN'] = getCsrfToken();
  }, []);
  return (
    <>
      {/**
         * Outlet é a funcão que foi configurada na main.jsx, responsavel
         * pela troca de paginas da web sem a necessidade de recarregar o navegador.
         */}
      <StoreProvider store={store}>
          <Outlet />
      </StoreProvider>
    </>

  )
}

export default App
