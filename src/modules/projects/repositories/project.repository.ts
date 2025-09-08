import { Inject, Injectable } from '@nestjs/common';
import { PrimaryRepository } from 'src/infra/database/typeorm/primary.repository';
import { TRANSACTIONAL_ENTITY_MANAGER } from 'src/infra/database/typeorm/transactional-entity-manager.provider';
import { EntityManager } from 'typeorm';
import { Project } from '../entities/project.entity';
import FilterBuilder, {
  IFilterQuery,
} from 'src/shared/helpers/filters/typeorm/FilterBuilder';

@Injectable()
export class ProjectRepository extends PrimaryRepository<Project> {
  constructor(
    @Inject(TRANSACTIONAL_ENTITY_MANAGER) entityManager: EntityManager,
  ) {
    super(Project, entityManager);
  }

  public async findAllByCompanyId(
    query: IFilterQuery,
    company_id: string,
  ): Promise<[Project[], number]> {
    const filterQueryBuilder = new FilterBuilder<Project>(
      this,
      query,
      'projects',
    );

    const queryBuilder = filterQueryBuilder
      .build()
      .leftJoinAndSelect('projects.tasks', 'tasks')
      .leftJoinAndSelect('tasks.user', 'user')
      .andWhere('projects.company_id = :company_id', {
        company_id,
      });
    const result = await queryBuilder.getManyAndCount();

    return result;
  }
}
