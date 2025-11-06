import React, { memo } from 'react';
import { ProjectsListProps } from '@/types/portfolioTypes';
import { ProjectCard } from './ProjectCard';

/**
 * Lista de projetos do portfólio
 * Renderiza cards de projetos em grid responsivo
 */
export const ProjectsList: React.FC<ProjectsListProps> = memo(({
  projectsRef,
  projects,
  onProjectClick,
  selectedProject,
}) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700 dark:text-gray-300">
          Nenhum projeto encontrado nesta categoria.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={projectsRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
      aria-label="Lista de projetos"
    >
      {projects.map((project, index) => (
        <div key={project.id} role="listitem">
          <ProjectCard
            project={project}
            index={index}
            onClick={onProjectClick}
            isActive={selectedProject?.id === project.id}
          />
        </div>
      ))}
    </div>
  );
});

ProjectsList.displayName = 'ProjectsList';

