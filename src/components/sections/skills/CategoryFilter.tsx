import React, { memo } from 'react';
import { CategoryFilterProps } from '@/types/skillsTypes';

export const CategoryFilter: React.FC<CategoryFilterProps> = memo(({
  activeCategory,
  onChange,
}) => {
  const categories: { id: typeof activeCategory; label: string }[] = [
    { id: 'all', label: 'Todas' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'other', label: 'Outras' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button px-4 py-2 rounded-full transition-all duration-base ease-in-out ${
            activeCategory === category.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-card-foreground hover:bg-primary hover:bg-opacity-10'
          }`}
          onClick={() => onChange(category.id)}
          aria-pressed={activeCategory === category.id}
          aria-label={`Filtrar por ${category.label}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

