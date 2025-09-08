import { ConflictException, Injectable } from '@nestjs/common';
import { HashService } from 'src/infra/plugins/hash/hash.service';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { RegisterUserRequest } from '../controller/request/registerUser.request';
import { User } from 'src/modules/users/entities/user.entity';
import { UserRoleEnum } from 'src/modules/users/enum/userRole.enum';
import { CompanyRepository } from 'src/modules/users/repositories/company.repository';
import { Company } from 'src/modules/users/entities/company.entity';

@Injectable()
export class RegisterUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly hashService: HashService,
  ) {}

  public async execute(data: RegisterUserRequest): Promise<User> {
    const { company_name, ...user_data } = data;

    const userExists = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (userExists) {
      throw new ConflictException('User with this email already exists.');
    }

    const hashedPassword = await this.hashService.hash(user_data.password);

    const company = await this.companyRepository.save(
      Object.assign(new Company(), { name: data.company_name }),
    );

    const user = new User();
    user.name = user_data.name;
    user.email = user_data.email;
    user.password = hashedPassword;
    user.role = UserRoleEnum.ADMIN;
    user.company_id = company.id;

    return this.userRepository.save(user);
  }
}
