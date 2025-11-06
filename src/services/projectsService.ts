import { projectsRepository } from './repositories/projectsRepository';
import type { Project } from '@/types/portfolioTypes';

export class ProjectsService {
  static getAll(): Project[] {
    return projectsRepository.getAll();
  }

  static getById(id: number): Project | undefined {
    return projectsRepository.getById(id);
  }

  static getByCategory(category: Project['category']): Project[] {
    return projectsRepository.getByCategory(category);
  }

  static getByTag(tag: string): Project[] {
    return projectsRepository.getByTag(tag);
  }
}
