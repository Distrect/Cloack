import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { ProgramTask } from './programTask.entity';
import { Program } from '../program/program.entity';
import { Task } from '../task/task.entity';

interface ICreateProgramTask {
  program: unknown;
  task: unknown;
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
    program,
    task,
  }: ICreateProgramTask) {
    const freshPT = this.programTaskRepository.create({
      program: program as Program,
      task: task as Task,
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
}
