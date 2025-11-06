import { memo } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useStructuredData } from '@/hooks/useStructuredData';

export const Home = memo(() => {
  useSEO({
    title: 'Luis Carlos - Portfólio | Desenvolvedor Full Stack',
    description:
      'Portfólio profissional de Luis Carlos - Desenvolvedor Full Stack especializado em React, TypeScript, Node.js e tecnologias modernas.',
    keywords: [
      'desenvolvedor',
      'full stack',
      'react',
      'typescript',
      'node.js',
      'portfólio',
      'programador',
    ],
  });

  useStructuredData({
    type: 'Person',
    name: 'Luis Carlos',
    jobTitle: 'Desenvolvedor Full Stack',
    description:
      'Desenvolvedor Full Stack especializado em React, TypeScript e Node.js',
    url: 'https://luiscarlos.dev',
    sameAs: [
      'https://github.com/LuisCarlos01',
      'https://linkedin.com/in/luiscarlos',
    ],
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-text-dark dark:text-text-light mb-4">
          Bem-vindo ao Portfólio
        </h1>
        <p className="text-text-dark dark:text-text-light">Em construção...</p>
      </main>
    </div>
  );
});

Home.displayName = 'Home';
