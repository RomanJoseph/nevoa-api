import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { Project } from '../entities/project.entity';

@Injectable()
export class GetProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  public async findOne(id: string): Promise<Project> {
    const entity = await this.repository.findById(id, {
      relations: ['tasks', 'tasks.user', 'company'],
    });

    if (!entity) {
      throw new NotFoundException('Project not found!');
    }

    return entity;
  }
}
