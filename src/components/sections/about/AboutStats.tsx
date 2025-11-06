import React, { memo } from 'react';
import { AboutStatsProps } from '@/types/aboutTypes';

export const AboutStats: React.FC<AboutStatsProps> = memo(({
  statsRef,
  statistics,
}) => {
  return (
    <div
      ref={statsRef}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {statistics.map((stat, index) => (
        <div
          key={index}
          className="stat-item bg-card-bg dark:bg-card-bg p-4 rounded-lg shadow-md text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/10"
        >
          <div className="text-primary text-3xl mb-2">{stat.icon}</div>
          <h4 className="text-lg font-semibold mb-1 text-text-dark dark:text-text-light">
            {stat.title}
          </h4>
          <p className="text-text-dark dark:text-text-light">
            <span
              className="stat-value text-xl font-bold text-primary"
              data-value={stat.value}
            >
              {stat.value}
            </span>
            {stat.suffix}
          </p>
        </div>
      ))}
    </div>
  );
});

AboutStats.displayName = 'AboutStats';

