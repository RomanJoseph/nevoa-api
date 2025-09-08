import { Module } from '@nestjs/common';
import { databaseProviders } from './typeorm/database.provider';
import { DataSource } from 'typeorm';
import { TransactionalEntityManagerProvider } from './typeorm/transactional-entity-manager.provider';

@Module({
  providers: [...databaseProviders, TransactionalEntityManagerProvider],
  exports: [
    ...databaseProviders,
    DataSource,
    TransactionalEntityManagerProvider,
  ],
})
export class DatabaseModule {}
