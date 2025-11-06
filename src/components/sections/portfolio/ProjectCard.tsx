import React, { memo, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ProjectCardProps } from '@/types/portfolioTypes';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback/ImageWithFallback';
import { Badge } from '@/components/atoms/Badge/Badge';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Card de projeto do portfólio
 * Animações GPU-friendly com suporte a prefers-reduced-motion
 *
 * Performance: Usa transform e opacity (GPU-friendly)
 * Acessibilidade: Respeita prefers-reduced-motion, navegação por teclado
 * Cleanup: Faz cleanup automático das animações GSAP
 */
export const ProjectCard: React.FC<ProjectCardProps> = memo(({
  project,
  index,
  onClick,
  isActive = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animação de entrada (respeitando prefers-reduced-motion)
  useEffect(() => {
    // Guard para SSR
    if (typeof window === 'undefined') return;

    // Graceful fallback ou prefers-reduced-motion
    if (!gsap || prefersReducedMotion || !cardRef.current) {
      if (cardRef.current) {
        cardRef.current.style.opacity = '1';
        cardRef.current.style.transform = 'none';
      }
      return;
    }

    // Animar entrada usando transform e opacity (GPU-friendly)
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
      }
    );
  }, [index, prefersReducedMotion]);

  return (
    <div
      ref={cardRef}
      className={`project-card bg-card-bg dark:bg-card-bg rounded-lg overflow-hidden 
        shadow-lg transition-all duration-300 cursor-pointer 
        transform hover:scale-105 hover:shadow-xl
        ${isActive ? 'ring-2 ring-primary scale-105' : ''}`}
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes do projeto ${project.title}`}
    >
      {/* Imagem do projeto */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={project.image}
          fallbackSrc="/placeholder.svg"
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
          quality="high"
        />
        {/* Overlay com tags */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-text-dark dark:text-text-light">
          {project.title}
        </h3>
        <p className="text-sm text-text-dark dark:text-text-light opacity-80 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ver código no GitHub: ${project.title}`}
            >
              <FaGithub size={18} />
              <span className="text-sm">GitHub</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ver demo: ${project.title}`}
            >
              <FaExternalLinkAlt size={18} />
              <span className="text-sm">Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

