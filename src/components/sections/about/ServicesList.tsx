import React, { memo } from 'react';
import { ServicesListProps } from '@/types/aboutTypes';
import { ServiceCard } from './ServiceCard';

export const ServicesList: React.FC<ServicesListProps> = memo(({
  servicesRef,
  services,
  hoveredService,
  onServiceHover,
  onServiceClick,
}) => {
  return (
    <div>
      <h3 className="text-heading-2xl font-bold text-center mb-8 text-primary">
        Meus <span className="text-foreground">Serviços</span>
      </h3>

      <div
        ref={servicesRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            index={index}
            isHovered={hoveredService === index}
            onHover={onServiceHover}
            onClick={onServiceClick}
          />
        ))}
      </div>
    </div>
  );
});

ServicesList.displayName = 'ServicesList';

