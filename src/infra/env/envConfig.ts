import * as dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 5432,
    username: process.env.DB_USER ?? 'projectmanager',
    password: process.env.DB_PASSWORD ?? 'projectmanager',
    database: process.env.DB_DATABASE ?? 'projectmanager',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'default_secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  },
  app: {
    port: process.env.PORT ?? 3000,
  },
};
