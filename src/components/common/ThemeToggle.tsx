import { memo } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';
import { Button } from '@/components/atoms/Button';

export const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
