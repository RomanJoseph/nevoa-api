import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectModule } from './modules/projects/projects.module';
import { TaskModule } from './modules/tasks/tasks.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, ProjectModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
