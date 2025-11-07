import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Opções para o hook useGsapEntrance
 */
export interface UseGsapEntranceOptions {
  /** Delay entre elementos (stagger) em segundos */
  stagger?: number;
  /** Propriedades CSS iniciais */
  from?: Record<string, unknown>;
  /** Propriedades CSS finais */
  to?: Record<string, unknown>;
  /** Delay inicial em segundos */
  delay?: number;
  /** Duração da animação em segundos */
  duration?: number;
  /** Easing function (padrão: 'power3.out') */
  ease?: string;
  /** Seletor CSS para elementos filhos a animar (padrão: '[data-anim]') */
  selector?: string;
}

/**
 * Hook para animações de entrada usando GSAP
 * Respeita prefers-reduced-motion e isola lógica de animação
 *
 * Performance: Usa apenas propriedades GPU-friendly (transform, opacity)
 * Acessibilidade: Respeita prefers-reduced-motion
 * Cleanup: Faz cleanup automático das animações
 *
 * @param ref - Referência ao elemento container
 * @param opts - Opções de animação
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * useGsapEntrance(containerRef, {
 *   stagger: 0.1,
 *   duration: 0.8,
 *   selector: '.card'
 * });
 * ```
 */
export function useGsapEntrance(
  ref: RefObject<HTMLElement>,
  opts: UseGsapEntranceOptions = {}
): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') {
      return;
    }

    // Verificar se GSAP está disponível
    if (!gsap) {
      // Graceful fallback: apenas mostrar elementos sem animação
      if (ref.current) {
        const elements = ref.current.querySelectorAll(
          opts.selector || '[data-anim]'
        );
        elements.forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
        });
      }
      return;
    }

    // Respeitar prefers-reduced-motion
    if (prefersReducedMotion) {
      // Sem animação: apenas mostrar elementos
      if (ref.current) {
        const elements = ref.current.querySelectorAll(
          opts.selector || '[data-anim]'
        );
        elements.forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
      }
      return;
    }

    if (!ref.current) return;

    // Criar contexto GSAP para cleanup automático
    const ctx = gsap.context(() => {
      const elements = ref.current!.querySelectorAll(
        opts.selector || '[data-anim]'
      );

      if (elements.length === 0) return;

      // Estado inicial
      const fromState = {
        opacity: 0,
        y: 20,
        ...opts.from,
      };

      // Estado final
      const toState = {
        opacity: 1,
        y: 0,
        stagger: opts.stagger ?? 0.08,
        duration: opts.duration ?? 0.7,
        ease: opts.ease || 'power3.out',
        delay: opts.delay,
        ...opts.to,
      };

      // Aplicar will-change para otimizar GPU antes de animar
      elements.forEach((el) => {
        (el as HTMLElement).style.willChange = 'transform, opacity';
      });

      // Animar elementos com callback para remover will-change após animação
      gsap.fromTo(elements, fromState, {
        ...toState,
        onComplete: () => {
          elements.forEach((el) => {
            (el as HTMLElement).style.willChange = 'auto';
          });
        },
      });
    }, ref.current);

    // Cleanup: reverter animações quando componente desmontar
    return () => {
      ctx.revert();
    };
  }, [
    ref,
    prefersReducedMotion,
    opts.stagger,
    opts.delay,
    opts.duration,
    opts.ease,
    opts.selector,
    opts.from,
    opts.to,
  ]);
}
