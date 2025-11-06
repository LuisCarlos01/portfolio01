import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Opções para o hook useGsapScrollTrigger
 */
export interface UseGsapScrollTriggerOptions {
  /** Trigger point para iniciar animação (padrão: 'top 70%') */
  start?: string;
  /** Callback quando elemento entra no viewport */
  onEnter?: () => void;
  /** Callback quando elemento sai do viewport */
  onLeave?: () => void;
  /** Executar apenas uma vez (padrão: true) */
  once?: boolean;
  /** Threshold para IntersectionObserver (0-1) */
  threshold?: number;
}

/**
 * Hook para animações baseadas em scroll usando GSAP ScrollTrigger
 * Respeita prefers-reduced-motion e isola lógica de animação
 *
 * Performance: Usa IntersectionObserver nativo via ScrollTrigger
 * Acessibilidade: Respeita prefers-reduced-motion
 * Cleanup: Faz cleanup automático do ScrollTrigger
 *
 * @param ref - Referência ao elemento trigger
 * @param opts - Opções de configuração
 *
 * @example
 * ```tsx
 * const sectionRef = useRef<HTMLElement>(null);
 * useGsapScrollTrigger(sectionRef, {
 *   start: 'top 80%',
 *   onEnter: () => {
 *     // Animar elementos quando entrarem no viewport
 *   },
 *   once: true
 * });
 * ```
 */
export function useGsapScrollTrigger(
  ref: RefObject<HTMLElement>,
  opts: UseGsapScrollTriggerOptions = {}
): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') {
      return;
    }

    // Verificar se GSAP e ScrollTrigger estão disponíveis
    if (!gsap || !ScrollTrigger) {
      // Graceful fallback: usar IntersectionObserver nativo
      if (ref.current && opts.onEnter) {
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && opts.onEnter) {
              opts.onEnter();
              if (opts.once) {
                observer.unobserve(entry.target);
              }
            }
          },
          { threshold: opts.threshold || 0.1 }
        );

        observer.observe(ref.current);

        return () => {
          observer.disconnect();
        };
      }
      return;
    }

    // Registrar ScrollTrigger (idempotente)
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Respeitar prefers-reduced-motion
    if (prefersReducedMotion) {
      // Sem animação: executar callback imediatamente se necessário
      if (opts.onEnter && ref.current) {
        // Verificar se já está visível
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              opts.onEnter?.();
              if (opts.once) {
                observer.unobserve(entry.target);
              }
            }
          },
          { threshold: opts.threshold || 0.1 }
        );

        observer.observe(ref.current);

        return () => {
          observer.disconnect();
        };
      }
      return;
    }

    if (!ref.current) return;

    // Criar ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: opts.start || 'top 70%',
      onEnter: opts.onEnter,
      onLeave: opts.onLeave,
      once: opts.once !== false, // Padrão: true
    });

    // Cleanup: matar ScrollTrigger quando componente desmontar
    return () => {
      scrollTrigger.kill();
    };
  }, [
    ref,
    prefersReducedMotion,
    opts.start,
    opts.once,
    opts.threshold,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    opts.onEnter,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    opts.onLeave,
  ]);
}

