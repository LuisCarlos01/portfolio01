export const logger = {
  info: (message: string, data?: unknown) => {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data || '');
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
};

