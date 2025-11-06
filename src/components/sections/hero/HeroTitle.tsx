import React, { memo } from 'react';
import { HeroTitleProps } from '@/types/heroTypes';

/**
 * Componente para o título principal da seção Hero
 */
export const HeroTitle: React.FC<HeroTitleProps> = memo(({ titleRef }) => {
  return (
    <h1
      ref={titleRef}
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark dark:text-text-light leading-tight"
    >
      Olá, sou <span className="text-primary">Luís Carlos</span>
    </h1>
  );
});

HeroTitle.displayName = 'HeroTitle';

