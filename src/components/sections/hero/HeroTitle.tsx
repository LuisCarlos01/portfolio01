import React, { memo } from 'react';
import { HeroTitleProps } from '@/types/heroTypes';

/**
 * Componente para o título principal da seção Hero
 */
export const HeroTitle: React.FC<HeroTitleProps> = memo(({ titleRef }) => {
  return (
    <h1
      ref={titleRef}
      className="text-display-lg md:text-display-xl lg:text-display-2xl font-bold text-foreground leading-tight tracking-tight"
    >
      Olá, sou <span className="text-primary">Luís Carlos</span>
    </h1>
  );
});

HeroTitle.displayName = 'HeroTitle';

