//@ts-nocheck
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

export interface IOrder {
  orderBy: string;
  orderType: 'ASC' | 'DESC';
}

export default class OrderBuilder<Entity> {
  constructor(
    private readonly queryBuilder: SelectQueryBuilder<Entity>,
    private readonly order: IOrder,
    private readonly alias: string,
  ) {}

  build(): SelectQueryBuilder<Entity> {
    if (!this.order?.orderBy) return;

    this.queryBuilder.orderBy(
      `${this.alias}.${this.order.orderBy.toLowerCase()}`,
      this.order.orderType,
    );
    return this.queryBuilder;
  }
}
