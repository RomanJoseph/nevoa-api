import { Inject, Injectable } from '@nestjs/common';
import { PrimaryRepository } from 'src/infra/database/typeorm/primary.repository';
import { TRANSACTIONAL_ENTITY_MANAGER } from 'src/infra/database/typeorm/transactional-entity-manager.provider';
import { EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';
import { Project } from 'src/modules/projects/entities/project.entity';
import FilterBuilder, {
  IFilterQuery,
} from 'src/shared/helpers/filters/typeorm/FilterBuilder';

@Injectable()
export class UserRepository extends PrimaryRepository<User> {
  constructor(
    @Inject(TRANSACTIONAL_ENTITY_MANAGER) entityManager: EntityManager,
  ) {
    super(User, entityManager);
  }

  public async findAllByCompanyId(
    query: IFilterQuery,
    company_id: string,
  ): Promise<[User[], number]> {
    const filterQueryBuilder = new FilterBuilder<User>(this, query, 'projects');

    const queryBuilder = filterQueryBuilder
      .build()
      .andWhere('company_id = :company_id', {
        company_id,
      });
    const result = await queryBuilder.getManyAndCount();

    return result;
  }
}
