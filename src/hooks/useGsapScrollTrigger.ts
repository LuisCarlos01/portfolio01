import { useEffect, RefObject, useRef } from 'react';
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
  ref: RefObject<HTMLElement | null>,
  opts: UseGsapScrollTriggerOptions = {}
): void {
  const prefersReducedMotion = usePrefersReducedMotion();
  // Ref para garantir que a animação só execute uma vez mesmo se o hook for re-executado
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Se já foi executado e é once, não fazer nada
    if (hasTriggeredRef.current && opts.once !== false) {
      return;
    }

    // Guard para SSR
    if (typeof window === 'undefined') {
      return;
    }

    // Verificar se GSAP e ScrollTrigger estão disponíveis
    if (!gsap || !ScrollTrigger) {
      // Graceful fallback: usar IntersectionObserver nativo
      if (ref.current && opts.onEnter && !hasTriggeredRef.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && opts.onEnter && !hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              opts.onEnter();
              if (opts.once !== false) {
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
      if (opts.onEnter && ref.current && !hasTriggeredRef.current) {
        // Verificar se já está visível
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              opts.onEnter?.();
              if (opts.once !== false) {
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

    // Criar ScrollTrigger apenas se ainda não foi executado
    const scrollTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: opts.start || 'top 70%',
      onEnter: () => {
        // Garantir que só execute uma vez
        if (hasTriggeredRef.current && opts.once !== false) {
          return;
        }
        hasTriggeredRef.current = true;
        opts.onEnter?.();
      },
      onLeave: opts.onLeave,
      once: opts.once !== false, // Padrão: true
    });

    // Cleanup: matar ScrollTrigger quando componente desmontar
    return () => {
      scrollTrigger.kill();
      // Resetar o ref apenas quando o componente desmontar completamente
      // Não resetar aqui para evitar retrigger durante re-renders
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

