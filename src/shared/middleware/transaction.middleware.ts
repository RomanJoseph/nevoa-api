import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    req.queryRunner = queryRunner;

    res.on('finish', () => {
      void (async () => {
        try {
          if (res.statusCode >= 400) {
            await queryRunner.rollbackTransaction();
          } else {
            await queryRunner.commitTransaction();
          }
        } catch {
          await queryRunner.rollbackTransaction();
        } finally {
          await queryRunner.release();
        }
      })();
    });

    next();
  }
}
