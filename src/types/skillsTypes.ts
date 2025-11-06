import { ReactNode } from 'react';

/**
 * Interface que define a estrutura de dados para uma habilidade
 */
export interface Skill {
  /** Nome da habilidade */
  name: string;
  /** Nível de proficiência (0-100) */
  level: number;
  /** Ícone React que representa a habilidade */
  icon: ReactNode;
  /** Categoria da habilidade */
  category: 'frontend' | 'backend' | 'other';
  /** Cor principal associada à habilidade/tecnologia */
  color: string;
  /** Descrição detalhada da habilidade */
  description: string;
  /** Projetos relacionados a esta habilidade */
  relatedProjects?: {
    /** ID único do projeto */
    id: number;
    /** Título do projeto */
    title: string;
    /** Descrição do projeto */
    description: string;
    /** Caminho da imagem do projeto */
    image: string;
  }[];
}

/**
 * Interface para as áreas de aplicação de uma habilidade
 */
export interface ApplicationArea {
  /** Título da área de aplicação */
  title: string;
  /** Descrição da área de aplicação */
  description: string;
}

/**
 * Tipo para representar a categoria ativa nos filtros
 */
export type ActiveCategory = 'all' | 'frontend' | 'backend' | 'other';

export interface SkillsHeaderProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

export interface CategoryFilterProps {
  activeCategory: ActiveCategory;
  onChange: (category: ActiveCategory) => void;
}

export interface SkillCardProps {
  skill: Skill;
  onClick: (skill: Skill) => void;
  isActive: boolean;
}

export interface SkillsListProps {
  skills: Skill[];
  onSkillClick: (skill: Skill) => void;
  selectedSkill: Skill | null;
}

export interface SkillDetailModalProps {
  skill: Skill;
  onClose: () => void;
  navigateToProject: (projectId: number) => void;
  getApplicationAreas: (skill: Skill) => ApplicationArea[];
}

