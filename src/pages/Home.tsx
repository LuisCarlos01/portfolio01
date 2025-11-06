import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="p-4">
        <nav>
          <Link to="/" className="text-primary">
            Portfólio
          </Link>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 text-text-dark dark:text-text-light">
          Bem-vindo ao Portfólio
        </h1>
        <p className="text-text-dark dark:text-text-light">
          Projeto em construção seguindo o plano de modernização.
        </p>
      </main>
    </div>
  );
};

export default Home;

