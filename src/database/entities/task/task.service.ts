import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Task } from './task.entity';
import { createTaskDto, updateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskEntityService {
  constructor(
    @Inject('TaskRepository') private taskRepository: Repository<Task>,
  ) {}

  public async getUserTags(userId: number) {
    return await this.taskRepository.find({
      where: { isReusable: true, user: { userId } },
    });
  }

  public async createTask(task: createTaskDto, userId?: number) {
    const freshTask = this.taskRepository.create({
      ...task,
      ...(userId ? { user: { userId } } : {}),
    });
    return this.saveTask(freshTask);
  }

  public async deleteTask(taskId: number) {
    const deleted = await this.taskRepository
      .createQueryBuilder('task')
      .delete()
      .from(Task)
      .where('taskId = :taskId', { taskId })
      .execute();
    console.log(deleted);
    return deleted;
  }

  public async updateTask(task: updateTaskDto, taskId: number) {
    const updated = await this.taskRepository
      .createQueryBuilder('task')
      .update(Task)
      .set({ ...task })
      .where('taskId = :taskId', { taskId })
      .execute();
    return updated;
  }

  public async saveTask(task: Task) {
    return await this.taskRepository.save(task);
  }
}
