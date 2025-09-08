import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { UpdateProjectRequest } from '../controller/request/updateProject.request';
import { Project } from '../entities/project.entity';

@Injectable()
export class UpdateProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  async update(id: string, data: UpdateProjectRequest): Promise<Project> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException('Project not found!');
    }

    return this.repository.save(Object.assign(entity, data));
  }
}
