import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';
import { CreateTaskRequest } from '../controller/request/createTask.request';
import { Task } from '../entities/task.entity';

@Injectable()
export class CreateTaskService {
  constructor(private readonly repository: TaskRepository) {}

  async create(data: CreateTaskRequest): Promise<Task> {
    const entity = new Task();

    entity.title = data.title;
    entity.description = data.description;
    entity.status = data.status;
    entity.priority = data.priority;
    entity.project_id = data.project_id;
    entity.assignee_id = data.assignee_id;
    entity.due_date = data.due_date;

    return this.repository.save(entity);
  }
}
