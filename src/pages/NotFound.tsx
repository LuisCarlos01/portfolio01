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
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display-2xl font-bold text-foreground mb-4">
          404
        </h1>
        <p className="text-heading-xl text-foreground mb-8">
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
