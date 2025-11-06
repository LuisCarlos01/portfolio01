import React, { memo } from 'react';
import { HeroImageProps } from '@/types/heroTypes';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';

/**
 * Componente para a imagem principal da seção Hero
 * Com bordas decorativas e efeitos de hover
 */
export const HeroImage: React.FC<HeroImageProps> = memo(({
  imageSrc,
  fallbackSrc,
  alt,
}) => {
  return (
    <div className="relative mx-auto max-w-[320px] md:max-w-[380px] lg:max-w-[400px]">
      <div className="relative group">
        <div className="w-full rounded-lg overflow-hidden shadow-xl transition-all duration-500 transform group-hover:scale-105">
          <ImageWithFallback
            src={imageSrc}
            fallbackSrc={fallbackSrc}
            alt={alt}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 rounded-lg"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
});

HeroImage.displayName = 'HeroImage';

