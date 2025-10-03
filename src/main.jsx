import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './styles/global.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <StrictMode>
      <BrowserRouter basename="/hc-frontend/">
        <App />
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>
);
