import { CookieUser } from './../../middleware/cookieMiddleware/cookie.middleware';
import { Injectable, Inject, Post } from '@nestjs/common';
import { ProgramEntityService } from 'src/database/entities/program/programEntity.service';
import {
  UpdateProgram,
  UpdateProgramDto,
  createProgramDto,
} from './dto/program.dto';
import { Tag } from 'src/database/entities/tag/tag.entity';
import { User } from 'src/database/entities/user/user.entity';
import { TaskEntityService } from 'src/database/entities/task/task.service';
import { ProgramTaskEntityService } from 'src/database/entities/programtask/programTaskEntityService.service';

@Injectable()
export class ProgramService {
  constructor(
    @Inject(ProgramEntityService)
    private programEntityService: ProgramEntityService,
    private taskEntityService: TaskEntityService,
    private ptEntityService: ProgramTaskEntityService,
  ) {}

  public async createProgram(requestBody: createProgramDto, user: any) {
    const freshProgram = await this.programEntityService.createProgram(
      requestBody,
    );

    freshProgram.user = { userId: user.userId } as User;

    if (requestBody.tagId) {
      freshProgram.tag = { tagId: requestBody.tagId } as Tag;
    }

    const savedProgram = await this.programEntityService.saveProgram(
      freshProgram,
    );

    return savedProgram;
  }

  public async updateProgram(programId: number, properties: UpdateProgram) {
    const updated = await this.programEntityService.updateProgram(
      { programId },
      properties,
    );

    return updated;
  }

  public async deleteProgram(programId: number) {
    return await this.programEntityService.deleteProgram({ programId });
  }

  public async updateProgramWithTasks(
    programId: number,
    requestBody: UpdateProgramDto[],
  ) {
    const toBeDeletedTasks = [];
    const toBeCreatedTasks = [];
    const toBeUpdatedTasks = [];
    const toBeDeletedProgramTasks = [];
    const toBeUpdatedProgramTasks = [];
    const toBeCreatedProgramTasks = [];

    requestBody.forEach((element) => {
      {
        const {
          isReusable,
          programTaskId,
          order,
          newOrder,
          created,
          deleted,
          task,
        } = element;

        if (!isReusable) {
          if (deleted) {
            toBeDeletedTasks.push(task);
            return;
          }

          if (created) {
            toBeCreatedTasks.push({ task, order: newOrder });
            return;
          }

          if (newOrder && newOrder !== order) {
            toBeUpdatedProgramTasks.push({ order: newOrder, programTaskId });
          }

          if (task.edited) {
            toBeUpdatedTasks.push(task);
            return;
          }
        } else {
          if (!created) {
            if (deleted) {
              toBeDeletedProgramTasks.push({ programTaskId });
              return;
            }

            if (newOrder && newOrder !== order) {
              toBeUpdatedProgramTasks.push({ order: newOrder, programTaskId });
              return;
            }
          } else {
            toBeCreatedProgramTasks.push({
              programId,
              taskId: task.taskId,
              isReusable: true,
              order: newOrder,
            });
          }
        }
      }
    });

    console.log(
      '------------------------------------------------',
      '\n',
      'toBeDeletedTasks',
      toBeDeletedTasks,
      '\n',
      'toBeCreatedTasks',
      toBeCreatedTasks,
      '\n',
      'toBeUpdatedTasks',
      toBeUpdatedTasks,
      '\n',
      'toBeUpdatedProgramTasks',
      toBeUpdatedProgramTasks,
      '\n',
      'toBeDeletedProgramTasks',
      toBeDeletedProgramTasks,
      '\n',
      'toBeCreatedProgramTasks',
      toBeCreatedProgramTasks,
      '\n',
      '-------------------------------------------------',
    );

    const createdTasks = await Promise.all([
      ...toBeCreatedTasks.map((tbct) =>
        this.taskEntityService.createTask(tbct.task),
      ),
    ]);

    createdTasks.forEach((newTask, i) => {
      console.log(toBeCreatedTasks[i]);
      toBeCreatedProgramTasks.push({
        programId,
        taskId: newTask.taskId,
        isReusable: false,
        order: toBeCreatedTasks[i].order,
      });
    });

    const res = await Promise.all([
      ...toBeDeletedTasks.map((tbdt) =>
        this.taskEntityService.deleteTask(tbdt.taskId),
      ),
      ...toBeCreatedProgramTasks.map(
        ({ programId: program, taskId: task, isReusable, order }) =>
          this.ptEntityService.createProgramTask({
            program,
            task,
            isReusable,
            order,
          }),
      ),
      ...toBeUpdatedTasks.map(({ taskId, ...rest }) =>
        this.taskEntityService.updateTask(rest, taskId),
      ),
      ...toBeUpdatedProgramTasks.map((tbupt) =>
        this.ptEntityService.updateProgramTask(tbupt),
      ),
      ...toBeDeletedProgramTasks.map((t) =>
        this.ptEntityService.deleteProgramTask(t.programTaskId),
      ),
    ]);
  }

  public async getPrograms(user: CookieUser) {
    const programsWithTasks =
      await this.programEntityService.getAllProgramsWithTasks({
        userId: user.userId,
      });

    return programsWithTasks;
  }
}

/*const program = await this.programEntityService.getProgram({
      programId: id,
    });

    const { programDescription, programName, tagId } = properties;

    program.programDescription =
      programDescription ?? program.programDescription;
    program.programName = programName ?? program.programName;
    program.tag = tagId ? ({ tagId } as Tag) : program.tag;*/

/*
    console.log({ ...programsWithTasks });

    const { programTasks, reusableTasks } = programsWithTasks;

    const sorted = [...programTasks, ...reusableTasks];

    delete programsWithTasks.programTasks;
    delete programsWithTasks.reusableTasks;

    // (programTasks as any).allTasks = sorted;

    console.log('321321321', { ...programTasks });

    return programsWithTasks;*/
