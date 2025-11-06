export const logger = {
  info: (message: string, data?: unknown) => {
    if (import.meta.env?.DEV) {
      // eslint-disable-next-line no-console
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  warn: (message: string, data?: unknown) => {
    // eslint-disable-next-line no-console
    console.warn(`[WARN] ${message}`, data || '');
  },
  error: (message: string, error?: unknown) => {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`, error || '');
  },
};
