import React, { memo } from 'react';
import { CategoryFilterProps } from '@/types/skillsTypes';

export const CategoryFilter: React.FC<CategoryFilterProps> = memo(
  ({ activeCategory, onChange }) => {
    const categories: { id: typeof activeCategory; label: string }[] = [
      { id: 'all', label: 'Todas' },
      { id: 'frontend', label: 'Frontend' },
      { id: 'backend', label: 'Backend' },
      { id: 'other', label: 'Outras' },
    ];

    return (
      <div
        className="flex flex-wrap justify-center gap-4 mb-12"
        role="tablist"
        aria-label="Filtrar habilidades por categoria"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button px-4 py-2 rounded-full transition-all duration-base ease-in-out 
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
  }
);

CategoryFilter.displayName = 'CategoryFilter';
