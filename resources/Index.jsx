import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

/**
 * Paginas
 */
import Home from './routes/Home.jsx';
import NewPost from './routes/NewPost.jsx';
import Loadings from './routes/Loadings';
import Login from './routes/auth/Login';


/**
 * Responsavel pelo sistema de rotas do frontend
 * sem a necessidade de atualizar a pagina, Outlet 
 * na App.jsx vai ser a responsavel por trocar entre
 * elas "element" inicial App, é onde o Outlet deve ficar
 * "children" vai ser as pastas que o Outlet da App vão 
 * carregar sem precisar atualizar, usando "path" para setar a
 * rota usada, e "element" para setar a pagina a ser carregada em si.
 */
const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: '/new',
                element: <NewPost />
            },
            {
                path:'/loading',
                element: <Loadings/>
            },
            {
                path: '/login',
                element: <Login />
            },
        ],
    },
]);
/**
 * ReactDOM, é o responsavel por carregar o conteudo do react, 
 * ele vai setar o react feito na div "root", que deve existir no 
 * index.html.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    {/**
     * <React.StrictMode>, É responsavel para ver os 
     * "erros" que podem não aparecer no terminal,
     * recomendo que em uso do desenvolvimento,
     * use ele para garantir que consiga lidar com algumas
     * situações de erros que não vão aparecer no terminal do
     * webpack.(vite no caso)
     */}
    <React.StrictMode>
        {/**
         * <RouterProvider router={router} />
         * Ele é responsavel por carregar as configurações de rotas que 
         * usei no projeto, com ele tu pode fazer varias coisas, mais no 
         * meu caso estou usando ele para carregar a pagina sem reload do metodo
         * createBrowserRouter([]).
         */}
        <RouterProvider router={router} />
    </React.StrictMode>,
    </>
)
