import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource, EntityManager } from 'typeorm';
import { Request } from 'express';

export const TRANSACTIONAL_ENTITY_MANAGER = 'TRANSACTIONAL_ENTITY_MANAGER';

export const TransactionalEntityManagerProvider: Provider = {
  provide: TRANSACTIONAL_ENTITY_MANAGER,
  useFactory: (req: Request, dataSource: DataSource): EntityManager => {
    return req.queryRunner
      ? req.queryRunner.manager
      : dataSource.createEntityManager();
  },
  inject: [REQUEST, DataSource],
};
