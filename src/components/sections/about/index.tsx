import React, { useRef, useState, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutHeader } from './AboutHeader';
import { AboutImage } from './AboutImage';
import { AboutContent } from './AboutContent';
import { AboutStats } from './AboutStats';
import { ServicesList } from './ServicesList';
import { ServiceModal } from './ServiceModal';
import { Service } from '@/types/aboutTypes';
import { services, statistics } from '@/data/aboutData';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useGsapScrollTrigger } from '@/hooks/useGsapScrollTrigger';

// Registrar ScrollTrigger (apenas no cliente)
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Componente principal da seção About
 *
 * Performance: Usa transform (y, x, scale, rotate) e opacity (GPU-friendly)
 * Acessibilidade: Respeita prefers-reduced-motion
 * Cleanup: Faz cleanup automático das animações GSAP e ScrollTrigger
 */
export const AboutSection: React.FC = memo(() => {
  // Refs para os elementos da seção
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Estados para serviços
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Hook para verificar prefers-reduced-motion
  const prefersReducedMotion = usePrefersReducedMotion();

  // Função para animar as estatísticas (respeitando prefers-reduced-motion)
  const animateStats = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    if (!statsRef.current) return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion) {
      const statItems = statsRef.current.querySelectorAll('.stat-item');
      const statValues = statsRef.current.querySelectorAll('.stat-value');

      statItems.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });

      statValues.forEach((el) => {
        const target = parseInt(el.getAttribute('data-value') || '0');
        el.textContent = target.toString();
      });
      return;
    }

    // Animar os cards de estatísticas (usando transform e opacity - GPU-friendly)
    gsap.fromTo(
      statsRef.current.querySelectorAll('.stat-item'),
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: 'back.out(1.7)',
        onComplete: () => {
          // Animar os contadores após os cards aparecerem
          const statElements =
            statsRef.current?.querySelectorAll('.stat-value');

          if (statElements && statElements.length > 0) {
            statElements.forEach((el) => {
              const target = parseInt(el.getAttribute('data-value') || '0');

              // Definir diretamente o valor final para garantir que apareça
              if (target > 0) {
                el.textContent = target.toString();
              }

              // Animar o contador
              gsap.fromTo(
                el,
                { textContent: 0 },
                {
                  textContent: target,
                  duration: 2,
                  ease: 'power2.inOut',
                  onUpdate: function () {
                    // Arredondar para inteiro durante a animação
                    el.textContent = Math.round(
                      parseFloat(el.textContent || '0')
                    ).toString();
                  },
                }
              );
            });
          }
        },
      }
    );
  }, [prefersReducedMotion]);

  // Função para animar os cards de serviços (respeitando prefers-reduced-motion)
  const animateServiceCards = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    if (!servicesRef.current) return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion) {
      const serviceCards =
        servicesRef.current.querySelectorAll('.service-card');
      serviceCards.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    // Animar cards usando transform e opacity (GPU-friendly)
    gsap.fromTo(
      servicesRef.current.querySelectorAll('.service-card'),
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      }
    );
  }, [prefersReducedMotion]);

  // Função para lidar com hover nos serviços
  const handleServiceHover = (index: number | null) => {
    setHoveredService(index);
  };

  // Função para mostrar detalhes do serviço em um modal
  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  // Fechar o modal de serviço
  const handleCloseModal = () => {
    setSelectedService(null);
  };

  // Usar hook customizado para ScrollTrigger
  // Criar callback estável para evitar retrigger das animações
  const handleScrollEnter = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion) {
      // Apenas mostrar elementos sem animação
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'none';
      }
      if (imageRef.current) {
        imageRef.current.style.opacity = '1';
        imageRef.current.style.transform = 'none';
      }
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('p, h3, a');
        elements.forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
      }
      animateStats();
      animateServiceCards();
      return;
    }

    // Aplicar will-change para otimizar GPU
    if (titleRef.current) {
      titleRef.current.style.willChange = 'transform, opacity';
    }
    if (imageRef.current) {
      imageRef.current.style.willChange = 'transform, opacity';
    }

    // Animar título (usando transform e opacity - GPU-friendly)
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        onComplete: () => {
          if (titleRef.current) {
            titleRef.current.style.willChange = 'auto';
          }
        },
      }
    );

    // Animar imagem com efeito de revelação (usando transform - GPU-friendly)
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.9,
        rotate: -5,
      },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        onComplete: () => {
          if (imageRef.current) {
            imageRef.current.style.willChange = 'auto';
          }
        },
      }
    );

    // Animar conteúdo com efeito de deslizamento (usando transform - GPU-friendly)
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('p, h3, a');
      if (elements.length > 0) {
        // Aplicar will-change nos elementos
        elements.forEach((el) => {
          (el as HTMLElement).style.willChange = 'transform, opacity';
        });

        gsap.fromTo(
          elements,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              elements.forEach((el) => {
                (el as HTMLElement).style.willChange = 'auto';
              });
            },
          }
        );
      }
    }

    // Animar estatísticas
    animateStats();

    // Animar cards de serviços
    animateServiceCards();
  }, [prefersReducedMotion, animateStats, animateServiceCards]);

  useGsapScrollTrigger(sectionRef, {
    start: 'top 70%',
    once: true,
    onEnter: handleScrollEnter,
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-background section-container overflow-hidden"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-4">
        <AboutHeader titleRef={titleRef} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <AboutImage imageRef={imageRef} />

          <div>
            <AboutContent contentRef={contentRef} />
            <AboutStats statsRef={statsRef} statistics={statistics} />
          </div>
        </div>

        <div className="mb-16">
          <ServicesList
            servicesRef={servicesRef}
            services={services}
            hoveredService={hoveredService}
            onServiceHover={handleServiceHover}
            onServiceClick={handleServiceClick}
          />
        </div>
      </div>

      <ServiceModal service={selectedService} onClose={handleCloseModal} />
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
