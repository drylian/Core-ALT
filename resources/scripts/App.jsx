import React from 'react';
import RouterController from "./routes/RouterController.jsx"
import { AuthProvider } from './contexts/AuthContext.jsx';

export default function App() {
  return (
    <AuthProvider>
        <RouterController />
    </AuthProvider>
  );
}