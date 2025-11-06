import React from 'react';
import { IconType } from 'react-icons';

export interface IconProps {
  icon: IconType;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 24,
  className = '',
  'aria-label': ariaLabel,
}) => {
  return (
    <IconComponent
      size={size}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  );
};
