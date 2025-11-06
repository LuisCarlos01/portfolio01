import type { Project, ProjectsRepository } from '@/types/portfolioTypes';

// Dados mockados - em produção viriam de uma API
const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-commerce Moderno',
    description:
      'Um site de e-commerce completo com tema escuro, integração de pagamento, carrinho de compras e painel administrativo para gerenciar produtos. Desenvolvido com React, Node.js e MongoDB.',
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
      'Aplicativo de gerenciamento de tarefas com funcionalidades de arrastar e soltar, categorias e lembretes. Interface intuitiva e responsiva para uso em qualquer dispositivo.',
    image: '/assets/project2.jpg',
    category: 'app',
    tags: ['React', 'Firebase', 'TailwindCSS'],
    github: 'https://github.com/LuisCarlos01',
    demo: 'https://example.com/todo-app',
  },
  {
    id: 3,
    title: 'Dashboard Analytics',
    description:
      'Painel administrativo para visualização de dados e métricas de desempenho de negócios. Gráficos interativos e relatórios em tempo real.',
    image: '/assets/project3.jpg',
    category: 'web',
    tags: ['React', 'TypeScript', 'Chart.js', 'Node.js'],
    github: 'https://github.com/LuisCarlos01',
    demo: 'https://example.com/dashboard',
  },
  {
    id: 4,
    title: 'Website Responsivo',
    description:
      'Site institucional responsivo com animações suaves e otimizado para SEO. Design moderno e performance otimizada.',
    image: '/assets/Responsive web design.jpeg',
    category: 'web',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    github: 'https://github.com/LuisCarlos01',
    demo: 'https://example.com/website',
  },
  {
    id: 5,
    title: 'App Mobile',
    description:
      'Aplicativo mobile desenvolvido com React Native. Interface nativa e performance otimizada para iOS e Android.',
    image: '/assets/project2.jpg',
    category: 'app',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    github: 'https://github.com/LuisCarlos01',
  },
  {
    id: 6,
    title: 'Design System',
    description:
      'Sistema de design completo com componentes reutilizáveis, guia de estilo e documentação. Focado em consistência e acessibilidade.',
    image: '/assets/project3.jpg',
    category: 'design',
    tags: ['Figma', 'Design Tokens', 'Storybook'],
    demo: 'https://example.com/design-system',
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
