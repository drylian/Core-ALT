import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'boxicons/css/boxicons.min.css'
import App from './scripts/App.jsx';
import { WebsiteProvider } from './scripts/contexts/WebsiteContext.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* configuração do site */}
    <WebsiteProvider>
      <App />
    </WebsiteProvider>
  </React.StrictMode>
);