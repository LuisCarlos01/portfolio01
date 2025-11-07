import { forwardRef, memo } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  titleId?: string;
}

/**
 * Componente para títulos de seção com estilo consistente
 */
export const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  (
    {
      title,
      subtitle,
      align = 'center',
      className = '',
      titleClassName = '',
      subtitleClassName = '',
      titleId,
    },
    ref
  ) => {
    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    return (
      <div ref={ref} className={`mb-12 ${alignClasses[align]} ${className}`}>
        <h2
          id={titleId}
          className={`text-heading-3xl font-bold mb-4 text-foreground relative inline-block pb-3 
            after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
            after:w-20 after:h-1 after:bg-primary after:rounded-full ${titleClassName}`}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`text-body-lg mb-2 text-foreground-secondary max-w-3xl mx-auto leading-relaxed ${subtitleClassName}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = 'SectionTitle';

export default memo(SectionTitle);
