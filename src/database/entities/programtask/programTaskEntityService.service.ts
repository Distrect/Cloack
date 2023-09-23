import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { ProgramTask } from './programTask.entity';
import { Program } from '../program/program.entity';
import { Task } from '../task/task.entity';

interface ICreateProgramTask {
  programId: unknown;
  taskId: unknown;
  isReusable: boolean;
  order: number;
}

interface IUpdateProgramTask {
  programTaskId: number;
  order?: number;
  program?: unknown;
  task?: unknown;
  isReusable?: boolean;
}

@Injectable()
export class ProgramTaskEntityService {
  constructor(
    @Inject('ProgramTaskRepository')
    private programTaskRepository: Repository<ProgramTask>,
  ) {}

  public async createProgramTask({
    isReusable,
    order,
    programId,
    taskId,
  }: ICreateProgramTask) {
    const freshPT = this.programTaskRepository.create({
      program: programId as Program,
      task: taskId as Task,
      order,
      isReusable,
    });
    return await this.save(freshPT);
  }

  public async updateProgramTask({
    programTaskId,
    ...rest
  }: IUpdateProgramTask) {
    const updated = await this.programTaskRepository.update(
      { programTaskId },
      { ...rest },
    );

    return updated;
  }

  public async deleteProgramTask(programTaskId: number) {
    const deleted = await this.programTaskRepository.delete({ programTaskId });
    return deleted;
  }

  public async save(entity: ProgramTask) {
    return await this.programTaskRepository.save(entity);
  }

  public async getProgramTaskOfProgram(programId: number) {
    return await this.programTaskRepository
      .createQueryBuilder('program_task')
      .leftJoinAndSelect('program_task.task', 'task')
      .where('program_task.program = :programId', { programId })
      .orderBy('program_task.order', 'ASC')
      .getMany();
  }
}
