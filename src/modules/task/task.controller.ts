import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/createTask')
  public async Create(
    @StoredUser() user: CookieUser,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const task = await this.taskService.create(user, createTaskDto);
    return { ok: true, message: 'Task successfully generated', task };
  }

  @Get('/getTasks')
  public async GetAllTasks(@StoredUser() user: CookieUser) {
    const userTasks = await this.taskService.findAll(user);
    return { ok: true, message: 'All user tasks is retrieved', userTasks };
  }
  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }*/

  @Patch('/updateTask/:taskIdd')
  public async UpdateTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = this.taskService.update(taskId, updateTaskDto);
    return { ok: true, message: 'Task succesfully updated', updatedTask };
  }

  @Delete('/deleteTask/:taskId')
  remove(@Param('taskId', ParseIntPipe) taskId: number) {
    const removed = this.taskService.remove(taskId);
    return { ok: true, message: 'Task succesfully removed' };
  }
}
