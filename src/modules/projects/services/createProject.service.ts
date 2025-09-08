import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectRequest } from '../controller/request/createProject.request';
import { Project } from '../entities/project.entity';

@Injectable()
export class CreateProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  async create(
    company_id: string,
    data: CreateProjectRequest,
  ): Promise<Project> {
    return this.repository.save(
      Object.assign(new Project(), { ...data, company_id }),
    );
  }
}
