import React, { Component, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useThemeStore } from '@/stores/useThemeStore';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div
      role="alert"
      className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark p-4"
    >
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-text-dark dark:text-text-light mb-4">
          Algo deu errado
        </h1>
        <p className="text-text-dark dark:text-text-light mb-4">
          {error.message || 'Ocorreu um erro inesperado'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Tentar novamente"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
};

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const initializeTheme = useThemeStore((state) => state.initialize);

  React.useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};
