import { QueryRunner } from 'typeorm';

declare global {
  namespace Express {
    interface Request {
      queryRunner?: QueryRunner;
    }
  }
}
