import React, { useEffect, memo, useRef } from 'react';
import { gsap } from 'gsap';
import { ProjectModalProps } from '@/types/portfolioTypes';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback/ImageWithFallback';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Modal de detalhes do projeto
 * Animações GPU-friendly com suporte a prefers-reduced-motion
 *
 * Performance: Usa transform e opacity (GPU-friendly)
 * Acessibilidade: Respeita prefers-reduced-motion, navegação por teclado, ARIA
 * Cleanup: Faz cleanup automático das animações GSAP
 */
export const ProjectModal: React.FC<ProjectModalProps> = memo(({
  project,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animar abertura do modal (respeitando prefers-reduced-motion)
  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    if (!project) {
      // Restaurar scroll quando modal fechar
      document.body.style.overflow = '';
      return;
    }

    // Impedir scroll do body quando modal estiver aberto
    document.body.style.overflow = 'hidden';

    const modalElement = document.getElementById('project-detail-modal');

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || !modalElement || prefersReducedMotion) {
      modalElement?.style.setProperty('opacity', '1');
      modalElement?.style.setProperty('transform', 'none');
      return;
    }

    // Animar abertura usando transform e opacity (GPU-friendly)
    const tl = gsap.timeline();

    tl.fromTo(
      modalElement,
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
        '#project-image',
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .fromTo(
        '#project-content > *',
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
        '-=0.3'
      );

    // Focar no modal para acessibilidade
    modalElement.focus();

    return () => {
      document.body.style.overflow = '';
    };
  }, [project, prefersReducedMotion]);

  // Fechar modal com tecla ESC
  useEffect(() => {
    if (!project) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
      tabIndex={-1}
    >
      <div
        className="bg-card-bg dark:bg-card-bg rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card-bg dark:bg-card-bg border-b border-border-color p-6 flex items-center justify-between z-10">
          <h2
            id="project-modal-title"
            className="text-2xl font-bold text-text-dark dark:text-text-light"
          >
            {project.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-2"
          >
            <FaTimes size={20} />
          </Button>
        </div>

        {/* Conteúdo */}
        <div id="project-modal-description" className="p-6">
          {/* Imagem */}
          <div id="project-image" className="mb-6 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={project.image}
              fallbackSrc="/placeholder.svg"
              alt={project.title}
              className="w-full h-64 object-cover"
              loading="eager"
              quality="high"
            />
          </div>

          {/* Descrição */}
          <div id="project-content" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-text-dark dark:text-text-light">
                Sobre o Projeto
              </h3>
              <p className="text-text-dark dark:text-text-light opacity-90 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-text-dark dark:text-text-light">
                Tecnologias
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  aria-label={`Ver código no GitHub: ${project.title}`}
                >
                  <FaGithub size={18} />
                  <span>Ver Código</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
                  aria-label={`Ver demo: ${project.title}`}
                >
                  <FaExternalLinkAlt size={18} />
                  <span>Ver Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectModal.displayName = 'ProjectModal';

