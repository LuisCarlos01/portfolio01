import React, { memo } from 'react';
import { SocialLinksProps } from '@/types/heroTypes';

/**
 * Componente para exibir os links sociais na seção Hero
 */
export const SocialLinks: React.FC<SocialLinksProps> = memo(({
  socialRef,
  links,
}) => {
  return (
    <div ref={socialRef} className="flex space-x-6 pt-4">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 dark:text-gray-500 hover:text-primary transition-colors duration-300"
          aria-label={link.ariaLabel}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
});

SocialLinks.displayName = 'SocialLinks';

