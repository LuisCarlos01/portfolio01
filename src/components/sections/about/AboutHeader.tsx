import React, { memo } from 'react';
import { AboutHeaderProps } from '@/types/aboutTypes';

export const AboutHeader: React.FC<AboutHeaderProps> = memo(({ titleRef }) => {
  return (
    <h2
      ref={titleRef}
      id="about-title"
      className="text-heading-3xl font-bold text-center mb-16 text-foreground relative"
    >
      Sobre <span className="text-primary">Mim</span>
      <div className="absolute w-20 h-1 bg-primary left-1/2 -translate-x-1/2 bottom-0 mt-4"></div>
    </h2>
  );
});

AboutHeader.displayName = 'AboutHeader';
