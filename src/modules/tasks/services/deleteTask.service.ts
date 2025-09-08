import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from '../entities/task.entity';

@Injectable()
export class DeleteTaskService {
  constructor(private readonly repository: TaskRepository) {}

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
