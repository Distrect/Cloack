import { Repository, QueryRunner, DataSource } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { SharedProgram } from '../program/program.audit';
import { SharedProgramTask } from '../programtask/programTask.audit';
import { SharedTask } from '../task/task.audit';
import { Program } from '../program/program.entity';

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
  }
}
