import * as dotenv from 'dotenv';
import { envConfig } from 'src/infra/env/envConfig';
import { DataSource, DataSourceOptions } from 'typeorm';

const envPath =
  process.env.NODE_ENV === 'production'
    ? '.env'
    : `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });

const postgresConfig: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.database.host,
  port: +(envConfig.database.port ?? 5432),
  username: envConfig.database.username,
  password: envConfig.database.password,
  database: envConfig.database.database,
  logging: false,
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource(postgresConfig);

      return dataSource.initialize();
    },
  },
];
