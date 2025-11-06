import { useEffect } from 'react';

interface StructuredDataProps {
  type?: 'Person' | 'WebSite' | 'Portfolio';
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
}

export const useStructuredData = ({
  type = 'Person',
  name = 'Luis Carlos',
  description = 'Desenvolvedor Full Stack especializado em React, TypeScript e Node.js',
  url = 'https://luiscarlos.dev',
  image = 'https://luiscarlos.dev/og-image.jpg',
  jobTitle = 'Desenvolvedor Full Stack',
  sameAs = [],
}: StructuredDataProps = {}) => {
  useEffect(() => {
    const baseUrl = url.startsWith('http') ? url : `https://${url}`;
    const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

    const getStructuredData = () => {
      switch (type) {
        case 'Person':
          return {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name,
            jobTitle,
            description,
            url: baseUrl,
            image: fullImage,
            ...(sameAs.length > 0 && { sameAs }),
          };

        case 'WebSite':
          return {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name,
            description,
            url: baseUrl,
          };

        case 'Portfolio':
          return {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            '@id': `${baseUrl}/#portfolio`,
            name: `${name} - Portfólio`,
            description,
            creator: {
              '@type': 'Person',
              name,
              jobTitle,
            },
          };

        default:
          return null;
      }
    };

    const structuredData = getStructuredData();

    if (!structuredData) {
      return;
    }

    // Remove script anterior se existir
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Adiciona novo script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, name, description, url, image, jobTitle, sameAs]);
};

