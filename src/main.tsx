import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { StoreProvider } from './context/authProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
  </StoreProvider>
);
