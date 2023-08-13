import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterController from './scripts/routers/RouterController'
import './index.css'
import { setConfig } from 'react-hot-loader';


setConfig({ reloadHooks: false });

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <React.StrictMode>
                <RouterController />
        </React.StrictMode>,
    </>
)
