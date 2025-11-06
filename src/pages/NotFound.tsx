import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';

export const NotFound = memo(() => {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text-dark dark:text-text-light mb-4">
          404
        </h1>
        <p className="text-xl text-text-dark dark:text-text-light mb-8">
          Página não encontrada
        </p>
        <Link to="/">
          <Button variant="primary">Voltar para Home</Button>
        </Link>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';
