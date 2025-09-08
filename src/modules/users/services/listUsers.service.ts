import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IFilterResponse } from 'src/shared/helpers/filters/IFilterResponse';
import { User } from '../entities/user.entity';
import { IFilterQuery } from 'src/shared/helpers/filters/typeorm/FilterBuilder';

@Injectable()
export class ListUsersService {
  constructor(private readonly repository: UserRepository) {}

  public async execute(
    company_id: string,
    query: IFilterQuery,
  ): Promise<IFilterResponse<User>> {
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
