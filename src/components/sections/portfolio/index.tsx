import React, { useRef, useState, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioHeader } from './PortfolioHeader';
import { CategoryFilter } from './CategoryFilter';
import { ProjectsList } from './ProjectsList';
import { ProjectModal } from './ProjectModal';
import { Project, PortfolioCategory } from '@/types/portfolioTypes';
import { ProjectsService } from '@/services/projectsService';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useGsapScrollTrigger } from '@/hooks/useGsapScrollTrigger';

// Registrar ScrollTrigger (apenas no cliente)
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Componente principal da seção Portfolio
 *
 * Performance: Usa transform (y, scale) e opacity (GPU-friendly)
 * Acessibilidade: Respeita prefers-reduced-motion
 * Cleanup: Faz cleanup automático das animações GSAP e ScrollTrigger
 */
export const PortfolioSection: React.FC = memo(() => {
  // Refs para elementos da DOM
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Estados
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Hook para verificar prefers-reduced-motion
  const prefersReducedMotion = usePrefersReducedMotion();

  // Filtrar projetos com base na categoria ativa
  const filteredProjects = useCallback(() => {
    if (activeCategory === 'all') {
      return ProjectsService.getAll();
    }
    return ProjectsService.getByCategory(activeCategory);
  }, [activeCategory]);

  // Função para animar os cards de projetos (respeitando prefers-reduced-motion)
  const animateProjectCards = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    if (!projectsRef.current) return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      projectCards.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    // Animar cards usando transform e opacity (GPU-friendly)
    gsap.fromTo(
      projectsRef.current.querySelectorAll('.project-card'),
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
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

  // Função para mudar a categoria ativa com animação (respeitando prefers-reduced-motion)
  const handleCategoryChange = useCallback(
    (category: PortfolioCategory) => {
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
      gsap.to('.project-card', {
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
              '.project-card',
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
              }
            );
          }, 100);
        },
      });
    },
    [prefersReducedMotion]
  );

  // Função para mostrar detalhes do projeto
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  // Função para fechar o modal
  const handleCloseModal = useCallback(() => {
    // Guard para SSR
    if (typeof window === 'undefined') {
      setSelectedProject(null);
      return;
    }

    const modal = document.getElementById('project-detail-modal');

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || !modal || prefersReducedMotion) {
      setSelectedProject(null);
      document.body.style.overflow = 'auto';
      return;
    }

    // Animar fechamento usando transform e opacity (GPU-friendly)
    gsap.to('#project-detail-modal', {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
      },
    });
  }, [prefersReducedMotion]);

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
      animateProjectCards();
      return;
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
      }
    );

    // Animar cards de projetos
    animateProjectCards();
  }, [prefersReducedMotion, animateProjectCards]);

  useGsapScrollTrigger(sectionRef, {
    start: 'top 70%',
    once: true,
    onEnter: handleScrollEnter,
  });

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="section-container bg-bg-light dark:bg-bg-dark relative overflow-hidden py-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção */}
        <PortfolioHeader titleRef={titleRef} />

        {/* Filtros de categoria */}
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />

        {/* Lista de projetos */}
        <ProjectsList
          projectsRef={projectsRef}
          projects={filteredProjects()}
          onProjectClick={handleProjectClick}
          selectedProject={selectedProject}
        />
      </div>

      {/* Modal de detalhes do projeto */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}
    </section>
  );
});

PortfolioSection.displayName = 'PortfolioSection';

