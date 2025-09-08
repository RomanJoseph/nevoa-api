import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { RegisterUserService } from './services/registerUser.service';
import { LoginUserService } from './services/loginUser.service';
import { ValidateTokenService } from './services/validateToken.service';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './guards/auth.guard';
import { HashModule } from 'src/infra/plugins/hash/hash.module';
import { JwtModule } from 'src/infra/plugins/jwt/jwt.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TransactionMiddleware } from 'src/shared/middleware/transaction.middleware';

@Module({
  imports: [UsersModule, HashModule, JwtModule, DatabaseModule],
  controllers: [AuthController],
  providers: [
    RegisterUserService,
    LoginUserService,
    ValidateTokenService,
    AuthGuard,
  ],
  exports: [ValidateTokenService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes(AuthController);
  }
}
