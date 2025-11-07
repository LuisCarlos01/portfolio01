import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react';
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
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      <div className="text-center max-w-md">
        <h1 className="text-heading-2xl font-bold text-foreground mb-4">
          Algo deu errado
        </h1>
        <p className="text-body-base text-foreground mb-4">
          {error.message || 'Ocorreu um erro inesperado'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-base ease-in-out"
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
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => {
        const errorObj =
          error instanceof Error ? error : new Error(String(error));
        return (
          <ErrorFallback error={errorObj} resetErrorBoundary={resetError} />
        );
      }}
      showDialog
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </Sentry.ErrorBoundary>
  );
};
