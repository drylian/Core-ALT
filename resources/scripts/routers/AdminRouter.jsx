/**
 * Rotas da Area Administrativa.
 */
import React from "react";
import { useRoutes } from "react-router-dom";
import AdminTeste from '../webpages/admin/teste.jsx'

const AdminRouter = () => {
  const element = useRoutes([
  {
    path: "/",
    element: <AdminTeste />,
  },
  {
    path: "/users",
    element: <AdminTeste />,
  },
  {
    path: "/settings",
    element: <AdminTeste />,
  },
]);

  return element;
};

export default AdminRouter;
