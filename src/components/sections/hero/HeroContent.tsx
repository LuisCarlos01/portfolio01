import React, { memo } from 'react';
import { HeroContentProps } from '@/types/heroTypes';

/**
 * Componente para o conteúdo textual da seção Hero
 */
export const HeroContent: React.FC<HeroContentProps> = memo(({
  contentRef,
  content,
}) => {
  return (
    <p
      ref={contentRef}
      className="text-body-base md:text-body-lg text-foreground-secondary max-w-2xl leading-relaxed font-normal"
    >
      {content}
    </p>
  );
});

HeroContent.displayName = 'HeroContent';

