import { useState, useEffect } from 'react';

/**
 * Hook para verificar se o usuário prefere movimento reduzido
 * Respeita a preferência de acessibilidade `prefers-reduced-motion`
 *
 * @returns {boolean} true se o usuário prefere movimento reduzido
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = usePrefersReducedMotion();
 * if (!prefersReducedMotion) {
 *   // Executar animação
 * }
 * ```
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') {
      return;
    }

    // Verificar preferência inicial
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listener para mudanças na preferência
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Adicionar listener (compatibilidade com navegadores antigos)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback para navegadores antigos
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
};

