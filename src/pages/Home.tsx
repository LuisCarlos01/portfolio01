import { memo } from 'react';

export const Home = memo(() => {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-text-dark dark:text-text-light mb-4">
          Bem-vindo ao Portfólio
        </h1>
        <p className="text-text-dark dark:text-text-light">
          Em construção...
        </p>
      </main>
    </div>
  );
});

Home.displayName = 'Home';
