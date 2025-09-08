import { Injectable } from '@nestjs/common';
import {
  Repository,
  EntityTarget,
  FindOptionsWhere,
  In,
  EntityManager,
  FindOneOptions,
} from 'typeorm';
import { PrimaryEntity } from './primary.entity';
import FilterBuilder, {
  IFilterQuery,
} from 'src/shared/helpers/filters/typeorm/FilterBuilder';

@Injectable()
export class PrimaryRepository<T extends PrimaryEntity> extends Repository<T> {
  private readonly entityName: string;

  constructor(
    private readonly entity: EntityTarget<T>,
    private readonly entityManager: EntityManager,
  ) {
    super(entity, entityManager);
    this.entityName =
      entity instanceof Function ? entity.name : entity.toString();
  }
  public async findById(id: string, options?: FindOneOptions<T>): Promise<T | null> {
    return this.findOne({
      //@ts-expect-error O typescript por algum motivo chora
      where: {
        id,
      },
      ...options,
    });
  }

  public async findInIds(ids: string[]): Promise<T[]> {
    return this.find({
      where: {
        id: In(ids),
      } as FindOptionsWhere<T> | FindOptionsWhere<T>[] | undefined,
    });
  }

  public async findAll(query: IFilterQuery): Promise<[T[], number]> {
    const filterQueryBuilder = new FilterBuilder<T>(
      this,
      query,
      this.entityName,
    );

    const queryBuilder = filterQueryBuilder.build();
    const result = await queryBuilder.getManyAndCount();
    return result;
  }
}
