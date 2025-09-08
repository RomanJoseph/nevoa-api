import { ObjectLiteral, Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import OrderBuilder, { IOrder } from './OrderBuilder';
import PageBuilder, { IPage } from './PageBuilder';
import WhereBuilder, { IFilter } from './WhereBuilder';
import { UnprocessableEntityException } from '@nestjs/common';

export interface IFilterQuery extends IFilter, IPage, IOrder {
  relations?: string[];
}

export default class FilterBuilder<Entity extends ObjectLiteral> {
  private readonly queryBuilder: SelectQueryBuilder<Entity>;

  constructor(
    entityRepository: Repository<Entity>,
    private readonly query: IFilterQuery,
    private readonly alias: string,
  ) {
    this.queryBuilder = entityRepository.createQueryBuilder(alias);

    if (query.relations && query.relations.length > 0) {
      query.relations.forEach(relation => {
        this.queryBuilder.leftJoinAndSelect(`${this.alias}.${relation}`, relation);
      });
    }

    if (query?.orderBy) {
      this.verifyColumnExists(query.orderBy, entityRepository);
    }

    query?.filterBy?.forEach((filterItem) =>
      this.verifyColumnExists(filterItem, entityRepository),
    );
  }

  verifyColumnExists(column: string, repo: Repository<Entity>): void {
    if (column.includes('.')) {
      return;
    }

    const columnExists = repo.metadata.findColumnWithPropertyName(
      column.toLowerCase(),
    );
    if (!columnExists) {
      throw new UnprocessableEntityException(
        `O valor ${column} não é válido para a propriedade filterBy ou orderBy`,
      );
    }
  }

  build(): SelectQueryBuilder<Entity> {
    const whereBuilder = new WhereBuilder<Entity>(
      this.queryBuilder,
      this.query,
      this.alias,
    );
    whereBuilder.build();

    const orderBuilder = new OrderBuilder<Entity>(
      this.queryBuilder,
      this.query,
      this.alias,
    );
    orderBuilder.build();

    const pageBuilder = new PageBuilder<Entity>(this.queryBuilder, this.query);
    pageBuilder.build();
    return this.queryBuilder;
  }
}
