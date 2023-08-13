import { useState, useEffect } from 'react';

import http from '../../api/http';
import history from '../../history';
export default function useAuth() {

  const [UserLevel, setUserLevel] = useState(0); // "0" é visitante
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Async Raiz, usado para todos os tipos de codigos
     */
    (async () => {
      
      const token = localStorage.getItem('token');

      if (token) {
        try {
          http.defaults.headers.alternightuser = `Bearer ${JSON.parse(token)}`;
          /**
           * Seta o level do usuário
           */
          const respose = await http.post('/auth/authenticate');
          console.log(respose.data)
          setUserLevel(respose.data.user.permissions); // level do usuário, quanto mais alto mais poder ele vai ter

        } catch (err) {
          /**
            * Token Invalido, possivel tentatica de fralde.
            */
          console.log("Erro ao verificar token :", err)
          localStorage.removeItem('token');
          http.defaults.headers.alternightuser = undefined;
          setUserLevel(0);
          history.push('/auth/login');
        }
      }
      setLoading(false);
    })()
  }, []);

  function handleLogout() {
    /**
     * Desloga do painel
     */
    setUserLevel(0);
    localStorage.removeItem('token');
    http.defaults.headers.alternightuser = undefined;
    history.push('/auth/login');
  }

  return { UserLevel, loading, handleLogout };
}