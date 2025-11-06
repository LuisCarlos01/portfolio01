import React, { useEffect, memo } from 'react';
import Typed from 'typed.js';
import { HeroSubtitleProps } from '@/types/heroTypes';

/**
 * Componente para o subtítulo animado da seção Hero
 */
export const HeroSubtitle: React.FC<HeroSubtitleProps> = memo(({
  subtitleRef,
  typedRef,
  typedStrings,
}) => {
  // Inicializar o efeito de digitação
  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: typedStrings,
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 800,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [typedStrings, typedRef]);

  return (
    <div
      ref={subtitleRef}
      className="text-xl md:text-2xl text-gray-300 dark:text-gray-400 font-medium mb-4"
    >
      <span>Sou </span>
      <span ref={typedRef} className="text-primary"></span>
    </div>
  );
});

HeroSubtitle.displayName = 'HeroSubtitle';

