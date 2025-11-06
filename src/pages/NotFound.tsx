import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { useSEO } from '@/hooks/useSEO';

export const NotFound = memo(() => {
  useSEO({
    title: '404 - Página não encontrada',
    description: 'A página que você está procurando não foi encontrada.',
    url: 'https://luiscarlos.dev/404',
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text-dark dark:text-text-light mb-4">
          404
        </h1>
        <p className="text-xl text-text-dark dark:text-text-light mb-8">
          Página não encontrada
        </p>
        <Link to="/" aria-label="Voltar para a página inicial">
          <Button variant="primary">Voltar para Home</Button>
        </Link>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';
