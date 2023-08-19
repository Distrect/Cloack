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

    await this.createSharedProgram(program, version);

    console.log(
      'Programs',
      program,
      'Tasks',
      task,
      'prgogramTask',
      programTask,
    );
  }

  public async getProgram(programId: number) {
    return await this.dataManager
      .getRepository(Program)
      .createQueryBuilder('program')
      // .select('program.programName')
      .where('program.programId = :programId', { programId })
      .getMany();
  }

  public async getProgramTasks(programId) {
    return await this.dataManager
      .getRepository(Task)
      .createQueryBuilder('task')
      .addSelect(['task.user_id'])
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

  public async createSharedProgram(programs: {}[], version: number) {
    return await this.sharedProgramRepository.save(
      programs.map((program) => ({ ...program, version })),
    );
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
