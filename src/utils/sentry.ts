import * as Sentry from '@sentry/react';

/**
 * Configuração do Sentry para error tracking e performance monitoring
 * Usa variáveis de ambiente para configuração
 */
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  const environment = import.meta.env.MODE || 'development';
  const enabled = import.meta.env.PROD && dsn;

  if (!enabled) {
    // eslint-disable-next-line no-console
    console.log('Sentry disabled:', { dsn: !!dsn, prod: import.meta.env.PROD });
    return;
  }

  Sentry.init({
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event, hint) {
      // Filtrar erros conhecidos ou não críticos
      if (event.exception) {
        const error = hint.originalException;
        if (error instanceof Error) {
          // Ignorar erros de rede conhecidos
          if (
            error.message.includes('NetworkError') ||
            error.message.includes('Failed to fetch')
          ) {
            return null;
          }
        }
      }
      return event;
    },
  });
};
