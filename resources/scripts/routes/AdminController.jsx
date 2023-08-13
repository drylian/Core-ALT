/**
 * Rotas da Area Administrativa.
 */
import React from "react";
import { useRoutes } from "react-router-dom";
import Teste from '../pages/admin/teste.jsx'
import RequireAuth from '../components/auth/RequireAuth.jsx';

const AdminController = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <RequireAuth Protected={1} component={Teste} />
    },
    {
      path: "/users",
      element: <Teste />,
    },
    {
      path: "/settings",
      element: <Teste />,
    },
  ]);

  return element;
};

export default AdminController;
