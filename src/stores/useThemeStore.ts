import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  initialize: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.classList.toggle(
            'dark',
            newTheme === 'dark'
          );
          return { theme: newTheme };
        });
      },
      initialize: () => {
        const stored = useThemeStore.getState().theme;
        document.documentElement.classList.toggle('dark', stored === 'dark');
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
