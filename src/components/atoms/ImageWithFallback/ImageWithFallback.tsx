import React, { useState, useEffect, memo, useRef, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { logger } from '@/utils/logger';

export interface ImageWithFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  quality?: 'low' | 'medium' | 'high';
  objectFit?: React.CSSProperties['objectFit'];
  onClick?: () => void;
}

/**
 * Componente de imagem otimizado com fallback automático e lazy loading
 * Suporta WebP com fallback para formatos tradicionais
 */
const ImageWithFallback = ({
  src,
  fallbackSrc = '/placeholder.svg',
  alt,
  className = '',
  style = {},
  width,
  height,
  loading = 'lazy',
  quality = 'medium',
  objectFit = 'cover',
  onClick,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Gera URL otimizada com WebP quando suportado
  const getOptimizedSrc = useCallback(
    (originalSrc: string): string => {
      if (
        !originalSrc ||
        originalSrc === 'undefined' ||
        originalSrc === 'null'
      ) {
        return fallbackSrc;
      }

      // Se já é uma URL externa ou SVG, não otimizar
      if (
        originalSrc.startsWith('http') ||
        originalSrc.startsWith('//') ||
        originalSrc.endsWith('.svg')
      ) {
        return originalSrc;
      }

      // Verifica suporte a WebP
      const supportsWebP =
        typeof document !== 'undefined' &&
        document
          .createElement('canvas')
          .toDataURL('image/webp')
          .indexOf('data:image/webp') === 0;

      if (supportsWebP && !originalSrc.includes('.webp')) {
        // Tenta usar WebP se disponível
        const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        return webpSrc;
      }

      return originalSrc;
    },
    [fallbackSrc]
  );

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (loading === 'eager' || isInView) {
      return;
    }

    if (!imgRef.current) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        rootMargin: '50px', // Carrega 50px antes de entrar na viewport
        threshold: 0.01,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, isInView]);

  // Carrega imagem quando entrar na viewport
  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (!src || src === 'undefined' || src === 'null') {
      setImgSrc(fallbackSrc);
      setError(true);
      return;
    }

    setIsLoaded(false);
    setError(false);

    const optimizedSrc = getOptimizedSrc(src);
    setImgSrc(optimizedSrc);

    const img = new Image();
    img.src = optimizedSrc;

    img.onload = () => {
      logger.info(`Image loaded: ${optimizedSrc}`);
      setImgSrc(optimizedSrc);
      setIsLoaded(true);
    };

    img.onerror = () => {
      logger.error(`Failed to load image: ${optimizedSrc}`);
      // Tenta fallback
      if (optimizedSrc !== src && optimizedSrc !== fallbackSrc) {
        setImgSrc(src);
        const fallbackImg = new Image();
        fallbackImg.src = src;
        fallbackImg.onload = () => {
          setImgSrc(src);
          setIsLoaded(true);
        };
        fallbackImg.onerror = () => {
          setImgSrc(fallbackSrc);
          setError(true);
        };
      } else {
        setImgSrc(fallbackSrc);
        setError(true);
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc, isInView, quality, getOptimizedSrc]);

  const blurStyle: React.CSSProperties = {
    filter: !isLoaded && !error ? 'blur(8px)' : 'none',
    transition: 'filter 0.3s ease-out, opacity 0.5s ease-out',
    objectFit,
    opacity: isLoaded ? 1 : 0.7,
    ...style,
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ width, height }}
    >
      {!isLoaded && !error && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.03) 100%)',
            backgroundSize: '200% 100%',
            animation: 'pulse-gradient 1.5s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        src={
          isInView
            ? imgSrc
            : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E'
        }
        alt={alt}
        className={cn(
          'w-full h-full transition-all',
          isLoaded ? 'opacity-100' : 'opacity-90'
        )}
        style={blurStyle}
        width={width}
        height={height}
        loading={loading}
        onClick={onClick}
        decoding="async"
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
      />

      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 text-white text-xs"
          role="alert"
          aria-label="Imagem não disponível"
        >
          <span>Imagem não disponível</span>
        </div>
      )}

      <style>{`
        @keyframes pulse-gradient {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -200% 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(ImageWithFallback);
