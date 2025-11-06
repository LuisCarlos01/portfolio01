import React, { useRef, useState, useEffect, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CategoryFilter } from './CategoryFilter';
import { SkillDetailModal } from './SkillDetailModal';
import { SkillsHeader } from './SkillsHeader';
import { SkillsList } from './SkillsList';
import { Skill, ActiveCategory } from '@/types/skillsTypes';
import { useSkillApplicationAreas } from '@/hooks/useSkillApplicationAreas';
import { skillsData } from '@/data/skillsData';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const SkillsSection: React.FC = memo(() => {
  // Refs para elementos da DOM
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Estados
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Hooks
  const { getApplicationAreas } = useSkillApplicationAreas();

  // Filtrar habilidades com base na categoria ativa
  const filteredSkills = useCallback(() => {
    return activeCategory === 'all'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  // Função para animar as barras de progresso
  const animateProgressBars = useCallback(() => {
    const progressBars = document.querySelectorAll('.progress-inner');
    const skillCards = document.querySelectorAll('.skill-card');

    if (progressBars.length > 0) {
      progressBars.forEach((bar, index) => {
        if (index < skillCards.length) {
          const skillLevel =
            skillCards[index].getAttribute('data-level') || '0';

          gsap.set(bar, { width: '0%' });

          gsap.to(bar, {
            width: `${skillLevel}%`,
            duration: 1,
            ease: 'power2.out',
            delay: 0.1 * index,
          });
        }
      });
    }
  }, []);

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

  // Função para mudar a categoria ativa com animação
  const handleCategoryChange = useCallback(
    (category: ActiveCategory) => {
      gsap.to('.skill-card', {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveCategory(category);

          setTimeout(() => {
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
    [animateProgressBars]
  );

  // Função para mostrar detalhes da habilidade
  const handleSkillClick = useCallback((skill: Skill) => {
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

    setTimeout(() => {
      setSelectedSkill(skill);
      document.body.classList.add('modal-transition');
    }, 300);
  }, []);

  // Função para fechar o modal
  const handleCloseModal = useCallback(() => {
    const modal = document.getElementById('skill-detail-modal');

    if (modal) {
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

          // Restaurar cards
          gsap.to('.skill-card', {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          });
        },
      });
    } else {
      setSelectedSkill(null);
      document.body.style.overflow = 'auto';
    }
  }, []);

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
      className="section-container bg-bg-light dark:bg-bg-dark relative overflow-hidden py-20"
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

