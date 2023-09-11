import {
  EditCriteria,
  UpdateProgram,
} from './../../../modules/program/dto/program.dto';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Program } from './program.entity';
import { createProgramDto } from 'src/modules/program/dto/program.dto';

@Injectable()
export class ProgramEntityService {
  constructor(
    @Inject('ProgramRepository') public programRepository: Repository<Program>,
  ) {}

  public async createProgram(program: createProgramDto) {
    const newPorgram = this.programRepository.create(program);
    return await this.saveProgram(newPorgram);
  }

  public async saveProgram(program: Program) {
    return await this.programRepository.save(program);
  }

  public async getProgramWithReltaions(params) {
    return await this.programRepository.find({
      where: { ...params },
      relations: ['tag'],
    });
  }

  public async getProgram(userId: number, programId: number) {
    return await this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.programtask', 'program_task')
      .leftJoinAndSelect('program_task.task', 'task')
      // .addSelect(
      //   'SUM(TIME_TO_SEC(task.taskDuration)) * COUNT(DISTINCT program_task.programTaskId) / COUNT(*)',
      //   'program_total',
      // )
      .orderBy('program_task.order', 'ASC')
      .groupBy('program.programId')
      .addGroupBy('task.taskId')
      .addGroupBy('program_Task.programTaskId')
      .where('program.user = :userId', { userId })
      .andWhere('program.programId = :programId', { programId })
      .getOne();
  }

  public async updateProgram(criteria: EditCriteria, partial: UpdateProgram) {
    return await this.programRepository.update(criteria, partial);
  }

  public async deleteProgram(id: EditCriteria) {
    return await this.programRepository.update(id, { isDeleted: true });
  }

  public async getAllProgramsWithTasks({ userId }: { userId: number }) {
    return await this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.programtask', 'program_task')
      .leftJoinAndSelect('program_task.task', 'task')
      // .addSelect(
      //   'SUM(TIME_TO_SEC(task.taskDuration)) * COUNT(DISTINCT program_task.programTaskId) / COUNT(*)',
      //   'program_total',
      // )
      .orderBy('program_task.order', 'ASC')
      .groupBy('program.programId')
      .addGroupBy('task.taskId')
      .addGroupBy('program_Task.programTaskId')
      .where('program.user = :userId', { userId })
      .getMany();
  }
}

/*return await this.programRepository.query(
      'select * from program as pr join program_task as pt on pr.programId = pt.program',
    );*/

/* return await this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.programTasks', 'program_task')
      .leftJoin('program.user', 'user')
      .leftJoin('program.reusableTasks', 'reusabletask')
      .leftJoinAndSelect('reusabletask.task', 'task')
      .where('program.user = :userId', { userId })
      .andWhere('program.programId = 1')
      .getMany();*/

/* return await this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.programTasks', 'program_taks')
      .leftJoinAndSelect('program.reusableTasks', 'reusabletask')
      .leftJoinAndSelect('reusabletask.task', 'task')
      .getMany();*/

/*select: {
        reusableTasks: {
          resusableId: true,
          task: true,
          order: true,
        },
      },*/
/* order: {
        programTasks: {
          order: 'ASC',
        },
        reusableTasks: {
          order: 'ASC',
        },
      },*/

/*return await this.programRepository.findOne({
      where: { user: { userId }, programId: 1 },
      relations: ['programTasks', 'reusableTasks.task'],
      
    });*/

/*return await this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.programtask', 'program_task')
      .leftJoinAndSelect('program_task.task', 'task')
      .orderBy('program_task.order', 'DESC')
      .getMany();*/

/*return await this.programRepository
      .createQueryBuilder('program')
      .leftJoinAndSelect('program.programtask', 'program_task')
      .innerJoinAndSelect(
        'program_task.task',
        'task',
        'program_task.task = task.taskId',
      )
      .addSelect(['program_task.order', 'task.taskName'])
      .getMany();*/

/*return await this.programRepository.find({
      where: {
        user: {
          userId,
        },
      },

      relations: {
        programtask: {
          task: true,
          program: true,
        },
      },
      order: {
        programtask: {
          order: 'ASC',
        },
      },
    });
  }*/

// .createQueryBuilder('program')
// .leftJoinAndSelect('program.programtask', 'program_task')
// .leftJoinAndSelect('program_task.task', 'task')
// .select([
//   'program.programId',
//   'program.programName',
//   'program.programDescription',
//   // Include all other columns from the Program entity
//   'program_task.programTaskId',
//   'program_task.order',
//   'program_task.isReusable',
//   // Include all columns from the ProgramTask entity
//   'task.taskId',
//   'task.taskName',
//   'task.taskDescription',
//   'task.taskDuration',
//   'task.taskColor',
//   'task.isReusable',
//   // Include all columns from the Task entity
//   'SUM(TIME_TO_SEC(task.taskDuration)) AS totalDuration',
// ])
// .groupBy('program.programId')
// .getRawMany();
/*.leftJoin('program.programtask', 'program_task')
      .leftJoin('program_task.task', 'task')
      .select([
        'program.programId',
        'program.programName',
        'SUM(TIME_TO_SEC(task.taskDuration)) AS totalDuration',
      ])
      .groupBy('program.programId, program.programName')
      .getRawMany();*/
/**/

/*.select([
        'program.programName',
        'program.programId',
        'program_task.programTaskId',
        'program_task.order',
        'task.taskName',
        'task.taskDuration',
        // 'SUM(TIME_TO_SEC(task.taskDuration)) as TotalDuration',
      ])*/
/*.addSelect([
        'SUM(TIME_TO_SEC(task.taskDuration))',
        'program.totalDuration',
      ])*/
/*.addGroupBy('program.programName')
      .addGroupBy('program.programId')
      .addGroupBy('program_task.programTaskId')
      .addGroupBy('program_task.order')
      .addGroupBy('task.taskName')
      .addGroupBy('task.taskDuration')*/
