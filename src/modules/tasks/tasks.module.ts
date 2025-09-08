import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TransactionMiddleware } from 'src/shared/middleware/transaction.middleware';
import { TaskController } from './controller/tasks.controller';
import { TaskRepository } from './repositories/task.repository';
import { CreateTaskService } from './services/createTask.service';
import { ListTaskService } from './services/listTask.service';
import { GetTaskService } from './services/getTask.service';
import { UpdateTaskService } from './services/updateTask.service';
import { DeleteTaskService } from './services/deleteTask.service';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TaskController],
  providers: [
    TaskRepository,
    CreateTaskService,
    ListTaskService,
    GetTaskService,
    UpdateTaskService,
    DeleteTaskService,
  ],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes(TaskController);
  }
}
