import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';
import { UpdateTaskRequest } from '../controller/request/updateTask.request';
import { Task } from '../entities/task.entity';

@Injectable()
export class UpdateTaskService {
  constructor(private readonly repository: TaskRepository) {}

  async update(id: string, data: UpdateTaskRequest): Promise<Task> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException('Task not found!');
    }

    return this.repository.save(
      Object.assign(entity, { ...data, assignee_id: data.assignee_id || null }),
    );
  }
}
