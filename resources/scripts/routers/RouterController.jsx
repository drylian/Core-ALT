/**
 * Controlador de rotas principal, responsavel por carregar a Bagaça toda.
 */
import React from 'react'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from '../App.jsx'
import NotFound from '../webpages/errors/NotFound.jsx';
import AdminRouter from './AdminRouter.jsx';
import ClientRouter from './ClientRouter.jsx';
import Home from '../webpages/Home.jsx'

function RouterController() {
    const router = createBrowserRouter([
        {
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: '/client/*',
                    element: <ClientRouter />
                },
                {
                    path: '/admin/*',
                    element: <AdminRouter />,
                },
                /**
                 * Lida com erros 404 da pagina principal
                 */
                {
                    path: '*',
                    element: <NotFound />
                },
            ],
        },
    ]);
    return (
        <>
            {/* Sistema de rotas principal serve para carregar todas as paginas do painel */}
            <RouterProvider router={router} />
        </>
    )
}
export default RouterController;