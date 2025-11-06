import React, { memo } from 'react';
import { CategoryFilterProps, PortfolioCategory } from '@/types/portfolioTypes';

/**
 * Componente de filtro de categorias para Portfolio
 * Respeita acessibilidade e usa transições CSS (GPU-friendly)
 *
 * Performance: Usa transform e opacity via CSS transitions
 * Acessibilidade: ARIA labels e navegação por teclado
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = memo(({
  activeCategory,
  onChange,
}) => {
  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'web', label: 'Web' },
    { id: 'app', label: 'Apps' },
    { id: 'design', label: 'Design' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Filtrar projetos por categoria">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button px-6 py-2 rounded-full transition-all duration-base ease-in-out 
            transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-card text-card-foreground hover:bg-primary hover:bg-opacity-10'
            }`}
          onClick={() => onChange(category.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onChange(category.id);
            }
          }}
          aria-pressed={activeCategory === category.id}
          aria-label={`Filtrar por ${category.label}`}
          role="tab"
          tabIndex={activeCategory === category.id ? 0 : -1}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

