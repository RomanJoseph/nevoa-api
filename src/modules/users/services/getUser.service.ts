import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class GetUserService {
  constructor(private readonly repository: UserRepository) {}

  public async findOne(id: string, company_id: string): Promise<User> {
    const entity = await this.repository.findOne({
      where: {
        id,
        company_id,
      },
    });

    if (!entity) {
      throw new NotFoundException('User not found!');
    }

    return entity;
  }
}
