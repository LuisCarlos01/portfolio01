import React, { memo } from 'react';
import { AboutImageProps } from '@/types/aboutTypes';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';

export const AboutImage: React.FC<AboutImageProps> = memo(({ imageRef }) => {
  return (
    <div ref={imageRef} className="relative group">
      <div className="w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden border-4 border-primary shadow-xl transition-all duration-500 transform group-hover:scale-105">
        <ImageWithFallback
          src="/assets/perfil02.JPEG"
          fallbackSrc="/assets/perfil06.jpg"
          alt="Luis Carlos"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 border-2 border-primary rounded-lg transform rotate-3 -z-10 transition-all duration-500 group-hover:rotate-6"></div>
      <div className="absolute inset-0 border-2 border-primary/50 rounded-lg transform -rotate-3 -z-10 transition-all duration-500 group-hover:-rotate-6"></div>
    </div>
  );
});

AboutImage.displayName = 'AboutImage';

