import type { Project, ProjectsRepository } from '@/types/portfolioTypes';

// Dados mockados - em produção viriam de uma API
const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-commerce Moderno',
    description:
      'Um site de e-commerce completo com tema escuro, integração de pagamento, carrinho de compras e painel administrativo para gerenciar produtos.',
    image: '/assets/foodie-ecommerce.jpeg',
    category: 'web',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    github: 'https://github.com/LuisCarlos01',
    demo: 'https://example.com/ecommerce',
  },
  {
    id: 2,
    title: 'App de Tarefas',
    description:
      'Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorias e lembretes.',
    image: '/assets/project2.jpg',
    category: 'app',
    tags: ['React', 'Firebase', 'TailwindCSS'],
    github: 'https://github.com/LuisCarlos01',
    demo: 'https://example.com/todo-app',
  },
];

class ProjectsRepositoryImpl implements ProjectsRepository {
  private projects: Project[];

  constructor(projects: Project[]) {
    this.projects = projects;
  }

  getAll(): Project[] {
    return [...this.projects];
  }

  getById(id: number): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  getByCategory(category: Project['category']): Project[] {
    if (category === 'all') {
      return this.getAll();
    }
    return this.projects.filter((project) => project.category === category);
  }

  getByTag(tag: string): Project[] {
    return this.projects.filter((project) =>
      project.tags.some((projectTag) =>
        projectTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }
}

// Exportar instância singleton
export const projectsRepository: ProjectsRepository =
  new ProjectsRepositoryImpl(projectsData);
