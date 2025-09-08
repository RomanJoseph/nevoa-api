import { Injectable } from '@nestjs/common';
import { IFilterResponse } from 'src/shared/helpers/filters/IFilterResponse';
import { IFilterQuery } from 'src/shared/helpers/filters/typeorm/FilterBuilder';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class ListTaskService {
  constructor(private readonly repository: TaskRepository) {}

  public async execute(
    query: IFilterQuery,
    company_id: string,
  ): Promise<IFilterResponse<Task>> {
    const [result, total] = await this.repository.findAllByCompanyId(
      query,
      company_id,
    );

    return {
      result,
      total,
      total_page: Math.ceil(total / (query.per_page || 10)),
    };
  }
}
