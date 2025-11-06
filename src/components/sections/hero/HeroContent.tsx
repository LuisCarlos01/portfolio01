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
      className="text-base md:text-lg text-gray-400 dark:text-gray-500 max-w-2xl"
    >
      {content}
    </p>
  );
});

HeroContent.displayName = 'HeroContent';

