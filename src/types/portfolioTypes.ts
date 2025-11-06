import { RefObject } from 'react';

/**
 * Interface para um projeto do portfólio
 */
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'web' | 'app' | 'design' | 'all';
  tags: string[];
  github?: string;
  demo?: string;
}

/**
 * Interface para o repositório de projetos
 */
export interface ProjectsRepository {
  getAll(): Project[];
  getById(id: number): Project | undefined;
  getByCategory(category: Project['category']): Project[];
  getByTag(tag: string): Project[];
}

/**
 * Props para o cabeçalho da seção Portfolio
 */
export interface PortfolioHeaderProps {
  titleRef: RefObject<HTMLHeadingElement | null>;
}

/**
 * Tipo para categoria de portfólio
 */
export type PortfolioCategory = 'all' | 'web' | 'app' | 'design';

/**
 * Props para filtro de categoria
 */
export interface CategoryFilterProps {
  activeCategory: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
}

/**
 * Props para card de projeto
 */
export interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  isActive?: boolean;
}

/**
 * Props para lista de projetos
 */
export interface ProjectsListProps {
  projectsRef: RefObject<HTMLDivElement | null>;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  selectedProject: Project | null;
}

/**
 * Props para modal de detalhes do projeto
 */
export interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}
