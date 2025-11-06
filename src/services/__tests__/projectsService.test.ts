import { describe, it, expect, vi } from 'vitest';
import { ProjectsService } from '../projectsService';
import { projectsRepository } from '../repositories/projectsRepository';

vi.mock('../repositories/projectsRepository');

describe('ProjectsService', () => {
  it('should get all projects', () => {
    const mockProjects = [
      {
        id: 1,
        title: 'Test Project',
        description: 'Test',
        image: '/test.jpg',
        category: 'web' as const,
        tags: ['React'],
      },
    ];

    vi.mocked(projectsRepository.getAll).mockReturnValue(mockProjects);

    const result = ProjectsService.getAll();

    expect(result).toEqual(mockProjects);
    expect(projectsRepository.getAll).toHaveBeenCalled();
  });

  it('should get project by id', () => {
    const mockProject = {
      id: 1,
      title: 'Test',
      description: 'Test',
      image: '/test.jpg',
      category: 'web' as const,
      tags: ['React'],
    };

    vi.mocked(projectsRepository.getById).mockReturnValue(mockProject);

    const result = ProjectsService.getById(1);

    expect(result).toEqual(mockProject);
    expect(projectsRepository.getById).toHaveBeenCalledWith(1);
  });
});
