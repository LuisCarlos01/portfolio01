import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
}

export const useSEO = ({
  title = 'Luis Carlos - Portfólio | Desenvolvedor Full Stack',
  description = 'Portfólio profissional de Luis Carlos - Desenvolvedor Full Stack especializado em React, TypeScript, Node.js e tecnologias modernas.',
  keywords = [
    'desenvolvedor',
    'full stack',
    'react',
    'typescript',
    'node.js',
    'portfólio',
    'programador',
  ],
  image = '/og-image.jpg',
  url = 'https://luiscarlos.dev',
  type = 'website',
  author = 'Luis Carlos',
}: SEOProps = {}) => {
  useEffect(() => {
    const fullTitle = title.includes('Luis Carlos') ? title : `${title} | Luis Carlos`;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const fullImage = image.startsWith('http') ? image : `${fullUrl}${image}`;

    // Atualizar título
    document.title = fullTitle;

    // Função helper para atualizar ou criar meta tag
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Meta tags básicas
    setMetaTag('description', description);
    setMetaTag('keywords', keywords.join(', '));
    setMetaTag('author', author);

    // Open Graph
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', fullUrl, true);
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', fullImage, true);
    setMetaTag('og:locale', 'pt_BR', true);
    setMetaTag('og:site_name', 'Luis Carlos - Portfólio', true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', fullUrl);
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Idioma do HTML
    document.documentElement.lang = 'pt-BR';
  }, [title, description, keywords, image, url, type, author]);
};

