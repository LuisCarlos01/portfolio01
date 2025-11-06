import React, { useEffect, useState, useRef, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

const greetings = [
  { text: 'Olá', language: 'Português' },
  { text: 'Hello', language: 'English' },
  { text: 'Hola', language: 'Español' },
  { text: 'Bonjour', language: 'Français' },
  { text: 'Ciao', language: 'Italiano' },
  { text: 'こんにちは', language: 'Japanese' },
  { text: '안녕하세요', language: 'Korean' },
  { text: 'Hallo', language: 'Deutsch' },
  { text: '你好', language: 'Chinese' },
  { text: 'Привет', language: 'Russian' },
  { text: 'مرحبا', language: 'Arabic' },
  { text: 'नमस्ते', language: 'Hindi' },
];

/**
 * Componente Preloader com animações GSAP
 * Respeita prefers-reduced-motion e usa propriedades GPU-friendly
 *
 * Performance: Usa transform e opacity (GPU-friendly)
 * Acessibilidade: Respeita prefers-reduced-motion
 */
export const Preloader: React.FC<PreloaderProps> = memo(({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animar saída do preloader
  const animatePreloaderExit = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') {
      onComplete();
      return;
    }

    if (!preloaderRef.current) {
      onComplete();
      return;
    }

    // Graceful fallback se GSAP não estiver disponível
    if (!gsap) {
      preloaderRef.current.style.opacity = '0';
      setTimeout(() => onComplete(), 100);
      return;
    }

    // Respeitar prefers-reduced-motion
    if (prefersReducedMotion) {
      preloaderRef.current.style.opacity = '0';
      setTimeout(() => onComplete(), 100);
      return;
    }

    // Animar saída usando transform e opacity (GPU-friendly)
    gsap.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      },
    });
  }, [onComplete, prefersReducedMotion]);

  // Rotacionar saudações a cada 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Animar texto a cada mudança (respeitando prefers-reduced-motion)
  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion) {
      if (textRef.current && languageRef.current) {
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'none';
        languageRef.current.style.opacity = '0.6';
        languageRef.current.style.transform = 'none';
      }
      return;
    }

    if (textRef.current && languageRef.current) {
      // Usar transform (y) e opacity (GPU-friendly)
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      gsap.fromTo(
        languageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [currentIndex, prefersReducedMotion]);

  // Animar spinner (respeitando prefers-reduced-motion)
  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion) {
      if (spinnerRef.current) {
        // Apenas mostrar spinner sem rotação
        spinnerRef.current.style.opacity = '1';
      }
      return;
    }

    if (spinnerRef.current) {
      // Usar transform: rotate (GPU-friendly)
      const animation = gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
      });

      return () => {
        animation.kill();
      };
    }
  }, [prefersReducedMotion]);

  // Finalizar preloader após 2.5 segundos
  useEffect(() => {
    const duration = 2500; // 2.5 segundos

    const timer = setTimeout(() => {
      animatePreloaderExit();
    }, duration);

    return () => clearTimeout(timer);
  }, [animatePreloaderExit]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[9999]"
      role="status"
      aria-label="Carregando portfólio"
    >
      <div className="text-center">
        {/* Spinner */}
        <div
          ref={spinnerRef}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8 mx-auto"
          aria-hidden="true"
        />

        {/* Texto rotativo */}
        <div
          ref={textRef}
          className="text-display-xl md:text-display-2xl font-bold text-foreground mb-2"
        >
          {greetings[currentIndex].text}
        </div>
        <div
          ref={languageRef}
          className="text-label-base text-foreground-muted"
        >
          {greetings[currentIndex].language}
        </div>
      </div>
    </div>
  );
});

Preloader.displayName = 'Preloader';

