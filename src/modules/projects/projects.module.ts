import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TransactionMiddleware } from 'src/shared/middleware/transaction.middleware';
import { ProjectController } from './controller/projects.controller';
import { ProjectRepository } from './repositories/project.repository';
import { CreateProjectService } from './services/createProject.service';
import { ListProjectService } from './services/listProject.service';
import { GetProjectService } from './services/getProject.service';
import { UpdateProjectService } from './services/updateProject.service';
import { DeleteProjectService } from './services/deleteProject.service';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProjectController],
  providers: [
    ProjectRepository,
    CreateProjectService,
    ListProjectService,
    GetProjectService,
    UpdateProjectService,
    DeleteProjectService,
  ],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes(ProjectController);
  }
}
