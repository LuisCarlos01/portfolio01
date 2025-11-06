import React, { memo } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ServiceCardProps } from '@/types/aboutTypes';

export const ServiceCard: React.FC<ServiceCardProps> = memo(({
  service,
  index,
  isHovered,
  onHover,
  onClick,
}) => {
  return (
    <div
      className={`service-card bg-card-bg dark:bg-card-bg rounded-lg p-6 shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl transform ${
        isHovered ? 'scale-105' : ''
      }`}
      style={{
        borderTop: `3px solid ${isHovered ? service.color : 'transparent'}`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(service)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(service);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes do serviço ${service.title}`}
    >
      <div className="icon mb-4 text-4xl" style={{ color: service.color }}>
        {service.icon}
      </div>
      <h4 className="text-xl font-bold mb-3 text-text-dark dark:text-text-light">
        {service.title}
      </h4>
      <p className="text-text-dark dark:text-text-light opacity-80">
        {service.description.substring(0, 100)}
        {service.description.length > 100 ? '...' : ''}
      </p>
      <div className="mt-4 flex justify-end">
        <button
          className="text-sm font-medium flex items-center transition-all duration-300"
          style={{ color: service.color }}
          aria-label={`Saber mais sobre ${service.title}`}
        >
          Saber mais{' '}
          <FaArrowRight className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

