import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Task } from './task.entity';
import { createTaskDto, updateTaskDto } from './dto/task.dto';
import { ProgramTask } from '../programtask/programTask.entity';

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
    console.log(task);
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
    const { userId, ...rest } = task;
    const updated = await this.taskRepository
      .createQueryBuilder('task')
      .update(Task)
      .set({ ...rest })
      .where('taskId = :taskId', { taskId })
      .execute();
    return updated;
  }

  public async saveTask(task: Task) {
    return await this.taskRepository.save(task);
  }

  public async getTasksOfProgram(programId: number) {
    return await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.programtask', 'program_task')
      .where('program_task.program = :programId', { programId })
      .getMany();
  }
}

/*ProgramTask,
        'program_task',
        'program_task.program = :programId and program_task.task = task.taskId',
        { programId },

*/
