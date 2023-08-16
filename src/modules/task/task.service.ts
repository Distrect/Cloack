import { Injectable, Inject } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntityService } from 'src/database/entities/task/task.service';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TaskEntityService)
    private taskEntityService: TaskEntityService,
  ) {}

  public async create(user: CookieUser, createTaskDto: CreateTaskDto) {
    return await this.taskEntityService.createTask(createTaskDto, user.userId);
  }

  public async findAll(user: CookieUser) {
    const userTags = await this.taskEntityService.getUserTags(user.userId);
    return userTags;
  }
  /*
  findOne(id: number) {
    return `This action returns a #${id} task`;
  }*/

  public async update(taskId: number, updateTaskDto: UpdateTaskDto) {
    const updated = await this.taskEntityService.updateTask(
      updateTaskDto,
      taskId,
    );
    return updated;
  }

  public async remove(taskId: number) {
    const deleted = await this.taskEntityService.deleteTask(taskId);
    return deleted;
  }
}
