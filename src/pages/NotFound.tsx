import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-text-dark dark:text-text-light">404</h1>
        <p className="text-xl mb-8 text-text-dark dark:text-text-light">Página não encontrada</p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

