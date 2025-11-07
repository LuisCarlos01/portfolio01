import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { AppProviders } from '@/contexts/AppProviders';
import { initSentry } from '@/utils/sentry';
import App from './App';
import './styles/index.css';

// Inicializar Sentry antes de renderizar a aplicação
initSentry();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProviders>
          <App />
          <Analytics />
        </AppProviders>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
