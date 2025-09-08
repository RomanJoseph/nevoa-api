import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class GetTaskService {
  constructor(private readonly repository: TaskRepository) {}

  public async findOne(id: string): Promise<Task> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException('Task not found!');
    }

    return entity;
  }
}
