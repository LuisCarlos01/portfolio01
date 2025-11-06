import React, { useEffect, useState, useRef, memo, useCallback } from 'react';
import { gsap } from 'gsap';

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

export const Preloader: React.FC<PreloaderProps> = memo(({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

  // Animar saída do preloader
  const animatePreloaderExit = useCallback(() => {
    if (preloaderRef.current) {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete();
        },
      });
    }
  }, [onComplete]);

  // Rotacionar saudações a cada 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Animar texto a cada mudança
  useEffect(() => {
    if (textRef.current && languageRef.current) {
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
  }, [currentIndex]);

  // Animar spinner
  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

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
      className="fixed inset-0 flex flex-col items-center justify-center bg-bg-dark z-[9999]"
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
          className="text-5xl md:text-7xl font-bold text-text-light mb-2"
        >
          {greetings[currentIndex].text}
        </div>
        <div
          ref={languageRef}
          className="text-sm text-text-light opacity-60"
        >
          {greetings[currentIndex].language}
        </div>
      </div>
    </div>
  );
});

Preloader.displayName = 'Preloader';

