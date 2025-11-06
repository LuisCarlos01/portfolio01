import React, { useEffect, memo } from 'react';
import { gsap } from 'gsap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { SkillDetailModalProps } from '@/types/skillsTypes';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';

export const SkillDetailModal: React.FC<SkillDetailModalProps> = memo(({
  skill,
  onClose,
  navigateToProject,
  getApplicationAreas,
}) => {
  // Adicionar ouvinte de evento para tecla Esc
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Animar o modal após ele ser renderizado
  useEffect(() => {
    if (document.getElementById('skill-detail-modal')) {
      const tl = gsap.timeline();

      tl.fromTo(
        '#skill-detail-modal',
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }
      )
        .fromTo(
          '#skill-icon',
          {
            opacity: 0,
            rotate: -30,
            scale: 0.5,
          },
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        )
        .fromTo(
          '#skill-info > *',
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .fromTo(
          '#skill-progress',
          {
            width: '0%',
            opacity: 0,
          },
          {
            width: `${skill.level}%`,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          '-=0.2'
        )
        .fromTo(
          '#related-projects .project-item',
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.5'
        );

      const modalElement = document.getElementById('skill-detail-modal');
      if (modalElement) {
        modalElement.focus();
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [skill.level]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 dark:bg-black dark:bg-opacity-80 backdrop-blur-sm modal-overlay overflow-y-auto"
      onClick={(e) => {
        if ((e.target as Element).classList.contains('modal-overlay')) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-modal-title"
    >
      <div
        id="skill-detail-modal"
        className="bg-card-bg dark:bg-card-bg rounded-2xl p-8 max-w-4xl w-full opacity-0 transform shadow-xl border border-primary/10 my-10 relative"
        style={{
          maxHeight: '80vh',
          overflowY: 'auto',
          background: `linear-gradient(135deg, var(--color-card-bg), var(--color-card-bg) 60%, ${skill.color}10, var(--color-card-bg))`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px ${skill.color}20, 0 0 20px ${skill.color}15`,
        }}
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão flutuante para fechar o modal */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-primary transition-colors duration-300"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {/* Cabeçalho do modal */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-6 relative z-10">
          {/* Ícone da habilidade */}
          <div
            id="skill-icon"
            className="p-6 rounded-2xl shadow-xl relative w-24 h-24 flex items-center justify-center"
            style={{
              backgroundColor: `${skill.color}15`,
              border: `1px solid ${skill.color}40`,
              boxShadow: `0 5px 15px ${skill.color}20, inset 0 0 20px ${skill.color}10`,
            }}
          >
            <div
              id="skill-info"
              className="text-4xl relative z-10"
              style={{ color: skill.color }}
            >
              {skill.icon}
            </div>
          </div>

          <div className="flex-1">
            <h3
              id="skill-modal-title"
              className="text-2xl font-bold mb-3 flex items-center text-text-dark dark:text-text-light"
            >
              {skill.name}
              <span
                className="ml-3 text-xs px-3 py-1 rounded-full text-white inline-flex items-center"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`,
                }}
              >
                {skill.category === 'frontend'
                  ? 'Frontend'
                  : skill.category === 'backend'
                  ? 'Backend'
                  : 'Outras Ferramentas'}
              </span>
            </h3>

            {/* Barra de progresso */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-text-dark dark:text-text-light font-medium">
                  Nível de Proficiência
                </span>
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: skill.color }}
                  ></div>
                  <span
                    className="font-bold text-lg"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  id="skill-progress"
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: skill.color,
                    width: '0%',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição da habilidade */}
        <div className="mb-10">
          <h4 className="text-lg font-semibold mb-3 flex items-center text-text-dark dark:text-text-light">
            Descrição
          </h4>
          <div className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 bg-opacity-30 border border-gray-300 dark:border-gray-700">
            <p className="text-text-dark dark:text-text-light leading-relaxed">
              {skill.description}
            </p>
          </div>
        </div>

        {/* Áreas de aplicação */}
        <div className="mb-10">
          <h4 className="text-lg font-semibold mb-4 flex items-center text-text-dark dark:text-text-light">
            Áreas de Aplicação
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getApplicationAreas(skill).map((area, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 bg-opacity-30 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                style={{
                  borderLeft: `3px solid ${skill.color}`,
                }}
              >
                <div className="text-lg font-medium mb-1 group-hover:text-primary transition-colors text-text-dark dark:text-text-light">
                  {area.title}
                </div>
                <p className="text-text-dark dark:text-text-light text-sm opacity-80">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Projetos Relacionados */}
        {skill.relatedProjects && skill.relatedProjects.length > 0 && (
          <div id="related-projects">
            <h4 className="text-lg font-semibold mb-4 flex items-center text-text-dark dark:text-text-light">
              Projetos Relacionados
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skill.relatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 bg-opacity-20 transition-all duration-300 hover:border-primary/30 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 project-item"
                  onClick={() => navigateToProject(project.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigateToProject(project.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver projeto ${project.title}`}
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      fallbackSrc="/assets/placeholder.jpg"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h5 className="text-white font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h5>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div
                      className="flex items-center justify-center text-xs font-medium px-3 py-1.5 rounded-full w-max text-white transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: skill.color }}
                    >
                      Ver Projeto{' '}
                      <FaExternalLinkAlt className="ml-1.5" size={8} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

SkillDetailModal.displayName = 'SkillDetailModal';

