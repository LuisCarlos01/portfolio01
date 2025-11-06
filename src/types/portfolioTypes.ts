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

export interface ProjectsRepository {
  getAll(): Project[];
  getById(id: number): Project | undefined;
  getByCategory(category: Project['category']): Project[];
  getByTag(tag: string): Project[];
}
