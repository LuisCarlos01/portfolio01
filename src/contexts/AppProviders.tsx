import React, { ReactNode, Component, ErrorInfo } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

interface AppProvidersProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center min-h-screen p-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-text-dark dark:text-text-light">
            Algo deu errado
          </h2>
          <pre className="text-red-500 mb-4">
            {this.state.error?.message || 'Erro desconhecido'}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Inicializar tema
  React.useEffect(() => {
    useThemeStore.getState().initialize();
  }, []);

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
