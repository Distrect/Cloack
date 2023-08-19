import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable, Inject } from '@nestjs/common';
import { TaskEntityService } from 'src/database/entities/task/task.service';
import { ProgramEntityService } from 'src/database/entities/program/programEntity.service';
import { ProgramTaskEntityService } from 'src/database/entities/programtask/programTaskEntityService.service';
import { SharedEntitiesService } from 'src/database/entities/shared/shared.service';
import { DataSource } from 'typeorm';
import { CookieUser } from './../../middleware/cookieMiddleware/cookie.middleware';
import { ProgramTask } from 'src/database/entities/programtask/programTask.entity';
import { User } from 'src/database/entities/user/user.entity';
import { Task } from 'src/database/entities/task/task.entity';
import { Tag } from 'src/database/entities/tag/tag.entity';
import {
  UpdateProgram,
  UpdateProgramDto,
  createProgramDto,
} from './dto/program.dto';

@Injectable()
export class ProgramService {
  constructor(
    @Inject(ProgramEntityService)
    private programEntityService: ProgramEntityService,
    @Inject('DATA_SOURCE') private dataManager: DataSource,
    private taskEntityService: TaskEntityService,
    private ptEntityService: ProgramTaskEntityService,
    private sharedEntititesService: SharedEntitiesService,
    private eventEmitter: EventEmitter2,
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

    const program = await this.getProgram(programId);
    const version = program.version + 1;

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

    const createdTasks = await Promise.all([
      ...toBeCreatedTasks.map((tbct) =>
        this.taskEntityService.createTask(tbct.task),
      ),
    ]);

    createdTasks.forEach(({ taskId }, i) => {
      toBeCreatedProgramTasks.push({
        programId,
        taskId,
        isReusable: false,
        order: toBeCreatedTasks[i].order,
      });
    });

    const allResponse = await Promise.all([
      ...toBeDeletedTasks.map((tbdt) =>
        this.taskEntityService.deleteTask(tbdt.taskId),
      ),
      ...toBeCreatedProgramTasks.map((tbcp) =>
        this.ptEntityService.createProgramTask(tbcp),
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

    console.log(allResponse);

    await this.sharedEntititesService.cloneProgramWithTasks(version, programId);
  }

  public async getPrograms(user: CookieUser) {
    await this.sharedEntititesService.cloneProgramWithTasks(1, 1);
    // const changedTasks = await this.dataManager
    //   .getRepository(Task)
    //   .createQueryBuilder('task')
    //   .select(['task.taskName', '1 as ver'])
    //   .addSelect(['1 as ver'])
    //   .leftJoin(ProgramTask, 'program_task', 'program_task.task = task.taskId')
    //   .where('program_task.program = :programId', { programId: 2 })
    //   .getMany();

    // console.log(changedTasks);

    const programsWithTasks =
      await this.programEntityService.getAllProgramsWithTasks({
        userId: user.userId,
      });

    return programsWithTasks;
  }

  public async getProgram(programId: number) {
    return await this.programEntityService.getProgram({ programId });
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

/*

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


    */

// const deneme = await this.programEntityService.programRepository
//   .createQueryBuilder('program')
//   .select('program.programName')
//   .where('programId = 1')
//   .getMany();
// console.log('deneme', deneme);
