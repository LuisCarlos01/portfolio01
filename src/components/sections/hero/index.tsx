import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { HeroTitle } from './HeroTitle';
import { HeroSubtitle } from './HeroSubtitle';
import { HeroContent } from './HeroContent';
import { SocialLinks } from './SocialLinks';
import { HeroImage } from './HeroImage';
import { ScrollIcon } from './ScrollIcon';
import {
  typedStrings,
  heroContent,
  heroImage,
  socialLinks,
} from '@/data/heroData';
import { logger } from '@/utils/logger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Componente principal da seção Hero que integra todos os componentes menores
 *
 * Performance: Usa transform (y) e opacity (GPU-friendly)
 * Acessibilidade: Respeita prefers-reduced-motion
 * Cleanup: Faz cleanup automático das animações GSAP
 */
export const HeroSection: React.FC = memo(() => {
  // Refs para animações
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Efeito para garantir visibilidade da seção hero
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.display = 'flex';
      sectionRef.current.style.opacity = '1';
      sectionRef.current.style.zIndex = '1';
      sectionRef.current.style.visibility = 'visible';
    }
  }, []);

  // Animações GSAP (respeitando prefers-reduced-motion)
  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    // Graceful fallback se GSAP não estiver disponível
    if (!gsap) {
      // Apenas mostrar elementos sem animação
      const elements = [
        titleRef.current,
        subtitleRef.current,
        contentRef.current,
        socialRef.current,
      ].filter(Boolean) as HTMLElement[];

      elements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Respeitar prefers-reduced-motion
    if (prefersReducedMotion) {
      // Sem animação: apenas mostrar elementos
      const elements = [
        titleRef.current,
        subtitleRef.current,
        contentRef.current,
        socialRef.current,
      ].filter(Boolean) as HTMLElement[];

      elements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const tl = gsap.timeline();

    // Definir estado inicial (usando transform e opacity - GPU-friendly)
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        contentRef.current,
        socialRef.current,
      ],
      {
        opacity: 0,
        y: 30, // Usar transform: translateY ao invés de top
      }
    );

    // Sequência de animação (usando transform e opacity)
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
        },
        '-=0.5'
      )
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        socialRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

    // Animação do ícone de scroll (usando transform - GPU-friendly)
    const scrollAnimation = gsap.to(scrollIconRef.current, {
      y: 15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
      scrollAnimation.kill();
    };
  }, [prefersReducedMotion]);

  // Função para rolar para a próxima seção
  const handleScrollToNext = () => {
    logger.info('Clique no ícone de scroll para navegar para próxima seção');

    // Tentar encontrar a próxima seção (about ou primeira seção após hero)
    let nextSection = document.getElementById('about');

    // Se não encontrou, tentar encontrar por querySelector
    if (!nextSection) {
      nextSection = document.querySelector(
        'section[id="about"]'
      ) as HTMLElement;
    }

    // Se ainda não encontrou, tentar encontrar pela classe ou qualquer seção após hero
    if (!nextSection) {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        if (section.id && section.id !== 'home') {
          nextSection = section as HTMLElement;
        }
      });
    }

    if (nextSection) {
      logger.info(`Seção encontrada: ${nextSection.id}`);
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      // Fallback: scroll suave para baixo
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-container bg-gradient-to-b from-bg-dark to-bg-light dark:from-bg-dark dark:to-bg-dark min-h-screen flex items-center justify-center py-24 px-4 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-3/5 space-y-8">
            <HeroTitle titleRef={titleRef} />
            <HeroSubtitle
              subtitleRef={subtitleRef}
              typedRef={typedRef}
              typedStrings={typedStrings}
            />
            <HeroContent contentRef={contentRef} content={heroContent} />
            <SocialLinks socialRef={socialRef} links={socialLinks} />
          </div>

          <div className="w-full md:w-2/5">
            <HeroImage
              imageSrc={heroImage.src}
              fallbackSrc={heroImage.fallbackSrc}
              alt={heroImage.alt}
            />
          </div>
        </div>

        <ScrollIcon
          scrollIconRef={scrollIconRef}
          onClick={handleScrollToNext}
        />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

