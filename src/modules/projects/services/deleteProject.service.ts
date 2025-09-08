import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { Project } from '../entities/project.entity';

@Injectable()
export class DeleteProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
