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
    @Inject('ProgramRepository') private programRepository: Repository<Program>,
  ) {}
  //Yeni Program yaratır. ProgramName ProgramDescription tagId
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

  public async getProgram(params: {
    programId?: number;
    programName?: string;
  }) {
    return await this.programRepository.findOne({ where: { ...params } });
  }

  public async updateProgram(criteria: EditCriteria, partial: UpdateProgram) {
    return await this.programRepository.update(criteria, partial);
  }

  public async deleteProgram(id: EditCriteria) {
    return await this.programRepository.update(id, { isDeleted: true });
  }
}
