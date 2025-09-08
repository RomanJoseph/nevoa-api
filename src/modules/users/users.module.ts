import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CompanyRepository } from './repositories/company.repository';
import { CreateCompanyUserService } from './services/createCompanyUser.service';
import { UsersController } from './controller/users.controller';
import { HashModule } from 'src/infra/plugins/hash/hash.module';
import { ValidateTokenService } from '../auth/services/validateToken.service';
import { JwtModule } from 'src/infra/plugins/jwt/jwt.module';
import { ListUsersService } from './services/listUsers.service';
import { GetUserService } from './services/getUser.service';

@Module({
  imports: [DatabaseModule, HashModule, JwtModule],
  controllers: [UsersController],
  providers: [
    UserRepository,
    CompanyRepository,
    CreateCompanyUserService,
    ValidateTokenService,
    ListUsersService,
    GetUserService,
  ],
  exports: [UserRepository, CompanyRepository],
})
export class UsersModule {}
