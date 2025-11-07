import React, { useRef, useState, useEffect, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CategoryFilter } from './CategoryFilter';
import { SkillDetailModal } from './SkillDetailModal';
import { SkillsHeader } from './SkillsHeader';
import { SkillsList } from './SkillsList';
import { Skill, ActiveCategory } from '@/types/skillsTypes';
import { useSkillApplicationAreas } from '@/hooks/useSkillApplicationAreas';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { skillsData } from '@/data/skillsData';

// Registrar ScrollTrigger (apenas no cliente)
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Componente principal da seção de habilidades
 *
 * Performance: Usa transform (y, scale) e opacity (GPU-friendly)
 * Acessibilidade: Respeita prefers-reduced-motion
 * Cleanup: Faz cleanup automático das animações GSAP
 */
export const SkillsSection: React.FC = memo(() => {
  // Refs para elementos da DOM
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Estados
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Hooks
  const { getApplicationAreas } = useSkillApplicationAreas();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Filtrar habilidades com base na categoria ativa
  const filteredSkills = useCallback(() => {
    return activeCategory === 'all'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  // Função para animar as barras de progresso (respeitando prefers-reduced-motion)
  const animateProgressBars = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion) {
      const progressBars = document.querySelectorAll('.progress-inner');
      const skillCards = document.querySelectorAll('.skill-card');

      progressBars.forEach((bar, index) => {
        if (index < skillCards.length) {
          const skillLevel =
            skillCards[index].getAttribute('data-level') || '0';
          (bar as HTMLElement).style.width = `${skillLevel}%`;
        }
      });
      return;
    }

    const progressBars = document.querySelectorAll('.progress-inner');
    const skillCards = document.querySelectorAll('.skill-card');

    if (progressBars.length > 0) {
      progressBars.forEach((bar, index) => {
        if (index < skillCards.length) {
          const skillLevel =
            skillCards[index].getAttribute('data-level') || '0';

          gsap.set(bar, { width: '0%' });

          // Animar usando width (não é GPU-friendly, mas necessário para barras de progresso)
          gsap.to(bar, {
            width: `${skillLevel}%`,
            duration: 1,
            ease: 'power2.out',
            delay: 0.1 * index,
          });
        }
      });
    }
  }, [prefersReducedMotion]);

  // Efeito para garantir visibilidade da seção
  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    section.style.display = 'block';
    section.style.opacity = '1';
    section.style.zIndex = '1';
    section.style.visibility = 'visible';

    // Configurar animação quando a seção estiver no viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          animateProgressBars();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [animateProgressBars]);

  // Função para mudar a categoria ativa com animação (respeitando prefers-reduced-motion)
  const handleCategoryChange = useCallback(
    (category: ActiveCategory) => {
      // Guard para SSR
      if (typeof window === 'undefined') {
        setActiveCategory(category);
        return;
      }

      // Graceful fallback ou prefers-reduced-motion
      if (!gsap || prefersReducedMotion) {
        setActiveCategory(category);
        return;
      }

      // Animar saída usando transform e opacity (GPU-friendly)
      gsap.to('.skill-card', {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveCategory(category);

          setTimeout(() => {
            // Animação para os novos cards usando transform e opacity (GPU-friendly)
            gsap.fromTo(
              '.skill-card',
              {
                y: 40,
                opacity: 0,
                scale: 0.95,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.08,
                duration: 0.5,
                ease: 'back.out(1.4)',
                onComplete: animateProgressBars,
              }
            );
          }, 100);
        },
      });
    },
    [animateProgressBars, prefersReducedMotion]
  );

  // Função para mostrar detalhes da habilidade (respeitando prefers-reduced-motion)
  const handleSkillClick = useCallback(
    (skill: Skill) => {
      // Guard para SSR
      if (typeof window === 'undefined') {
        setSelectedSkill(skill);
        return;
      }

      // Graceful fallback ou prefers-reduced-motion
      if (!gsap || prefersReducedMotion) {
        setSelectedSkill(skill);
        return;
      }

      // Efeito de zoom suave no card clicado usando transform e opacity (GPU-friendly)
      const cards = document.querySelectorAll('.skill-card');
      cards.forEach((card) => {
        if (card.querySelector('h3')?.textContent === skill.name) {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power2.out',
          });
        } else {
          gsap.to(card, {
            opacity: 0.6,
            duration: 0.3,
          });
        }
      });

      // Pequeno atraso para melhorar a experiência
      setTimeout(() => {
        setSelectedSkill(skill);
        document.body.classList.add('modal-transition');
      }, 300);
    },
    [prefersReducedMotion]
  );

  // Função para fechar o modal (respeitando prefers-reduced-motion)
  const handleCloseModal = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') {
      setSelectedSkill(null);
      return;
    }

    const modal = document.getElementById('skill-detail-modal');

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || !modal || prefersReducedMotion) {
      setSelectedSkill(null);
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-transition');

      // Restaurar cards
      const cards = document.querySelectorAll('.skill-card');
      cards.forEach((card) => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'none';
      });
      return;
    }

    // Animar fechamento usando transform e opacity (GPU-friendly)
    gsap.to('#skill-detail-modal', {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedSkill(null);
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-transition');

        // Restaurar cards usando transform e opacity (GPU-friendly)
        gsap.to('.skill-card', {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      },
    });
  }, [prefersReducedMotion]);

  // Função para navegar para um projeto específico
  const navigateToProject = useCallback((_projectId: number) => {
    const projectSection = document.getElementById('portfolio');
    if (projectSection) {
      setSelectedSkill(null);
      document.body.style.overflow = 'auto';

      setTimeout(() => {
        projectSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-container bg-background relative overflow-hidden py-20"
      aria-labelledby="skills-title"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção */}
        <SkillsHeader titleRef={titleRef} />

        {/* Filtros de categoria */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />

        {/* Lista de habilidades */}
        <SkillsList
          skills={filteredSkills()}
          onSkillClick={handleSkillClick}
          selectedSkill={selectedSkill}
        />
      </div>

      {/* Modal de detalhes da habilidade */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={handleCloseModal}
          navigateToProject={navigateToProject}
          getApplicationAreas={getApplicationAreas}
        />
      )}
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';
