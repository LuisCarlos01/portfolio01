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
      className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed font-normal"
    >
      {content}
    </p>
  );
});

HeroContent.displayName = 'HeroContent';

