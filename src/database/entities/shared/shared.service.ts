import { Repository, QueryRunner, DataSource } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { SharedProgram } from '../program/program.audit';
import { SharedProgramTask } from '../programtask/programTask.audit';
import { SharedTask } from '../task/task.audit';
import { Program } from '../program/program.entity';
import { Task } from '../task/task.entity';
import { ProgramTask } from '../programtask/programTask.entity';

@Injectable()
export class SharedEntitiesService {
  constructor(
    @Inject('SharedProgramRepository')
    private sharedProgramRepository: Repository<SharedProgram>,
    @Inject('SharedProgramTaskRepository')
    private sharedProgramTaskRepository: Repository<SharedProgramTask>,
    @Inject('SharedTaskRepository')
    private sharedTaskRepository: Repository<SharedTask>,
    @Inject('DATA_SOURCE') private dataManager: DataSource,
  ) {}

  public async cloneProgramWithTasks(version: number, programId: number) {
    console.log(await this.getProgram(programId));
    console.log(await this.getProgramTasks(programId));
    console.log(await this.getProgramTaskTable(programId));
    await this.createSharedProgramTask(
      await this.getProgramTaskTable(programId),
      version,
    );
    await this.createSharedProgram(await this.getProgram(programId), version);
    await this.createSharedTask(await this.getProgramTasks(programId), version);
  }

  public async getProgram(programId: number) {
    return await this.dataManager
      .getRepository(Program)
      .createQueryBuilder('program')
      .where('program.programId = :programId', { programId })
      .getMany();
  }

  public async getProgramTasks(programId: number, version = 1) {
    /*const querry =
      'SELECT `task`.`order` AS `order`, `task`.`taskName` AS `taskName`, `task`.`taskDescription` AS `taskDescription`, `task`.`taskDuration` AS `taskDuration`, `task`.`taskColor` AS `taskColor`, `task`.`isReusable` AS `isReusable`, `task`.`taskId` AS `taskId`, `task`.`userUserId` AS `userUserId`, CONVERT($,UNSIGNED) as version FROM `task` `task` LEFT JOIN `program_task` `program_task` ON `program_task`.`task` = `task`.`taskId` WHERE `program_task`.`program` = 1'.replace(
        '$',
        version.toString(),
      );

    return this.dataManager.query(querry);*/
    return await this.dataManager
      .getRepository(Task)
      .createQueryBuilder('task')
      .leftJoin(ProgramTask, 'program_task', 'program_task.task = task.taskId')
      .where('program_task.program = :programId', { programId })
      .getMany();
  }

  public async getProgramTaskTable(programId) {
    return await this.dataManager
      .getRepository(ProgramTask)
      .createQueryBuilder('program_task')
      .where('program_task.program = :programId', { programId })
      .getMany();
  }

  public async createSharedTask(tasks: Task[], version: number) {
    const sharedTasks = tasks.map((t) => {
      return this.sharedTaskRepository.create({
        isReusable: t.isReusable,
        order: t.order,
        taskColor: t.taskColor,
        taskDescription: t.taskDescription,
        taskName: t.taskName,
        taskDuration: t.taskDuration,
        userId: t.userId,
        taskId: t.taskId,
        version,
      });
    });

    return await this.sharedTaskRepository.insert(sharedTasks);
  }

  public async createSharedProgram(programs: Program[], version: number) {
    const sharedPrograms = programs.map((program) =>
      this.sharedProgramRepository.create({
        ...program,
        version,
      }),
    );

    return await this.sharedProgramRepository.insert(sharedPrograms);
  }

  public async createSharedProgramTask(
    programTasks: ProgramTask[],
    version: number,
  ) {
    const sharedProgramTasks = programTasks.map((pt) =>
      this.sharedProgramTaskRepository.create({
        ...pt,
        version,
      }),
    );

    return await this.sharedProgramTaskRepository.insert(sharedProgramTasks);
  }
}

/*const prs = await this.dataManager
      .getRepository(Program)
      .createQueryBuilder('program')
      .select(['*', `coalesce(${version},version)`])
      .where('program.programId = :programId', { programId })
      .getMany();
    const programs = await this.sharedProgramRepository
      .createQueryBuilder('shared_program')
      .insert()
      .values(prs);*/

/*

  // const changedPrograms =
    // console.log(changedPrograms);
    // const changedTasks = await this.dataManager
    //   .getRepository(Task)
    //   .createQueryBuilder('task')
    //   .select('task.taskName')
    //   .leftJoin(ProgramTask, 'program_task', 'program_task.task = task.taskId')
    //   .where('program_task.program = :programId', { programId })
    //   .getMany();
    // console.log(changedTasks);
    
    const [program, task, programTask] = await Promise.all([
      this.getProgram(programId),
      this.getProgramTasks(programId),
      this.getProgramTaskTable(programId),
    ]);

    //await this.createSharedProgram(program, version);

    console.log(
      'Programs',
      program,
      'Tasks',
      task,
      'prgogramTask',
      programTask,
    );
      */

/* return await this.dataManager
      .getRepository(Task)
      .createQueryBuilder('task')
      .leftJoin(ProgramTask, 'program_task', 'program_task.task = task.taskId')
      .where('program_task.program = :programId', { programId })
      .getMany();*/

/* isReusable: pt.isReusable,
        order: pt.order,
        programId: pt.programId,
        programTaskId: pt.programTaskId,
        taskId: pt.taskId,*/
/*isDeleted: program.isDeleted,
        programDescription: program.programDescription,
        programName: program.programName,
        userId: program.userId,*/
