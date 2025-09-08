import { Injectable } from '@nestjs/common';
import { IFilterResponse } from 'src/shared/helpers/filters/IFilterResponse';
import { IFilterQuery } from 'src/shared/helpers/filters/typeorm/FilterBuilder';
import { ProjectRepository } from '../repositories/project.repository';
import { Project } from '../entities/project.entity';

@Injectable()
export class ListProjectService {
  constructor(private readonly repository: ProjectRepository) {}

  public async execute(
    query: IFilterQuery,
    user_id: string,
  ): Promise<IFilterResponse<Project>> {
    const [result, total] = await this.repository.findAllByCompanyId(
      query,
      user_id,
    );

    return {
      result,
      total,
      total_page: Math.ceil(total / (query.per_page || 10)),
    };
  }
}
