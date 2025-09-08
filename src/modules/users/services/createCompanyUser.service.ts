import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { HashService } from 'src/infra/plugins/hash/hash.service';
import { User } from '../entities/user.entity';
import { UserRoleEnum } from '../enum/userRole.enum';
import { CreateCompanyUserRequest } from '../controller/request/createCompanyUser.request';

@Injectable()
export class CreateCompanyUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  public async execute(
    company_id: string,
    data: CreateCompanyUserRequest,
  ): Promise<User> {
    const hashedPassword = await this.hashService.hash(data.password);

    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = hashedPassword;
    user.company_id = company_id;
    user.role = UserRoleEnum.MEMBER;

    return this.userRepository.save(user);
  }
}
