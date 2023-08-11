import { Injectable, Inject, Post } from '@nestjs/common';
import { ProgramEntityService } from 'src/database/entities/program/programEntity.service';
import { UpdateProgram, createProgramDto } from './dto/program.dto';
import { Tag } from 'src/database/entities/tag/tag.entity';
import { User } from 'src/database/entities/user/user.entity';

@Injectable()
export class ProgramService {
  constructor(
    @Inject(ProgramEntityService)
    private programEntityService: ProgramEntityService,
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
}

/*const program = await this.programEntityService.getProgram({
      programId: id,
    });

    const { programDescription, programName, tagId } = properties;

    program.programDescription =
      programDescription ?? program.programDescription;
    program.programName = programName ?? program.programName;
    program.tag = tagId ? ({ tagId } as Tag) : program.tag;*/
