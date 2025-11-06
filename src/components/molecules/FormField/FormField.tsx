import React from 'react';
import { Input, InputProps } from '@/components/atoms/Input';
import { Icon, IconProps } from '@/components/atoms/Icon';
import { cn } from '@/utils/cn';

export interface FormFieldProps extends InputProps {
  icon?: IconProps['icon'];
  iconPosition?: 'left' | 'right';
}

export const FormField: React.FC<FormFieldProps> = ({
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {icon && iconPosition === 'left' && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon
            icon={icon}
            size={20}
            className="text-foreground-muted"
          />
        </div>
      )}
      <Input
        className={cn(
          icon && iconPosition === 'left' && 'pl-10',
          icon && iconPosition === 'right' && 'pr-10',
          className
        )}
        {...props}
      />
      {icon && iconPosition === 'right' && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon
            icon={icon}
            size={20}
            className="text-foreground-muted"
          />
        </div>
      )}
    </div>
  );
};
