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
  quality: _quality = 'medium',
  objectFit = 'cover',
  onClick,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Verifica suporte a WebP (memoizado)
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Verificar suporte a WebP uma vez
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    setSupportsWebP(checkWebPSupport());
  }, []);

  // Gera URLs otimizadas (WebP e fallback)
  const getImageSources = useCallback(
    (originalSrc: string): { webp?: string; fallback: string } => {
      if (
        !originalSrc ||
        originalSrc === 'undefined' ||
        originalSrc === 'null'
      ) {
        return { fallback: fallbackSrc };
      }

      // Se já é uma URL externa ou SVG, não otimizar
      if (
        originalSrc.startsWith('http') ||
        originalSrc.startsWith('//') ||
        originalSrc.endsWith('.svg') ||
        originalSrc.endsWith('.gif')
      ) {
        return { fallback: originalSrc };
      }

      // Gerar URL WebP se suportado e não for já WebP
      const webpSrc =
        supportsWebP && !originalSrc.includes('.webp')
          ? originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
          : undefined;

      return {
        webp: webpSrc,
        fallback: originalSrc,
      };
    },
    [fallbackSrc, supportsWebP]
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
    if (!isInView || supportsWebP === null) {
      return;
    }

    if (!src || src === 'undefined' || src === 'null') {
      setImgSrc(fallbackSrc);
      setError(true);
      return;
    }

    setIsLoaded(false);
    setError(false);

    const { webp, fallback } = getImageSources(src);

    // Preload WebP se disponível, senão usa fallback
    const img = new Image();
    const imageToLoad = webp || fallback;

    img.onload = () => {
      logger.info(`Image loaded: ${imageToLoad}`);
      setImgSrc(imageToLoad);
      setIsLoaded(true);
    };

    img.onerror = () => {
      logger.error(`Failed to load image: ${imageToLoad}`);
      // Se tentou WebP e falhou, tenta fallback original
      if (webp && imageToLoad === webp) {
        const fallbackImg = new Image();
        fallbackImg.src = fallback;
        fallbackImg.onload = () => {
          setImgSrc(fallback);
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

    img.src = imageToLoad;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc, isInView, supportsWebP, getImageSources]);

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
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.03) 100%)',
            backgroundSize: '200% 100%',
            animation: 'pulse-gradient 1.5s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
      )}

      {isInView && supportsWebP !== null ? (
        <picture>
          {supportsWebP && getImageSources(src).webp && (
            <source srcSet={getImageSources(src).webp} type="image/webp" />
          )}
          <img
            ref={imgRef}
            src={imgSrc || getImageSources(src).fallback}
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
        </picture>
      ) : (
        <img
          ref={imgRef}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
          alt=""
          className="w-full h-full"
          width={width}
          height={height}
          loading={loading}
          aria-hidden="true"
        />
      )}

      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-foreground/30 text-foreground text-label-base"
          role="alert"
          aria-label="Imagem não disponível"
        >
          <span className="text-card-foreground">Imagem não disponível</span>
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
