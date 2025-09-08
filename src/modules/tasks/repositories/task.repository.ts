import { Inject, Injectable } from '@nestjs/common';
import { PrimaryRepository } from 'src/infra/database/typeorm/primary.repository';
import { TRANSACTIONAL_ENTITY_MANAGER } from 'src/infra/database/typeorm/transactional-entity-manager.provider';
import { EntityManager } from 'typeorm';
import { Task } from '../entities/task.entity';
import FilterBuilder, {
  IFilterQuery,
} from 'src/shared/helpers/filters/typeorm/FilterBuilder';

@Injectable()
export class TaskRepository extends PrimaryRepository<Task> {
  constructor(
    @Inject(TRANSACTIONAL_ENTITY_MANAGER) entityManager: EntityManager,
  ) {
    super(Task, entityManager);
  }

  public async findAllByCompanyId(
    query: IFilterQuery,
    company_id: string,
  ): Promise<[Task[], number]> {
    const filterQueryBuilder = new FilterBuilder<Task>(this, query, 'tasks');

    const queryBuilder = filterQueryBuilder
      .build()
      .leftJoinAndSelect('tasks.user', 'user')
      .leftJoinAndSelect('tasks.project', 'project')
      .andWhere('project.company_id = :company_id', { company_id });
    const result = await queryBuilder.getManyAndCount();
    return result;
  }
}
