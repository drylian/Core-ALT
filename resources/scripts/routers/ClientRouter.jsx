/**
 * Rotas da Area dos Clientes.
 */
import React from "react";
import { useRoutes } from "react-router-dom";
import ClientTeste from '../webpages/client/teste.jsx'

const ClientRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <ClientTeste />,
    },
    {
      path: "/users",
      element: <ClientTeste />,
    },
    {
      path: "/settings",
      element: <ClientTeste />,
    },
  ]);

  return element;
};

export default ClientRouter;
