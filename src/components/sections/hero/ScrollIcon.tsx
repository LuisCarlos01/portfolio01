import React, { memo } from 'react';
import { BsArrowDown } from 'react-icons/bs';
import { ScrollIconProps } from '@/types/heroTypes';

/**
 * Componente para o ícone de scroll na parte inferior da seção Hero
 */
export const ScrollIcon: React.FC<ScrollIconProps> = memo(({
  scrollIconRef,
  onClick,
}) => {
  return (
    <div
      ref={scrollIconRef}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Rolar para próxima seção"
    >
      <BsArrowDown className="text-primary text-3xl" />
    </div>
  );
});

ScrollIcon.displayName = 'ScrollIcon';

