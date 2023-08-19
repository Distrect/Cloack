import {
  Controller,
  Get,
  Body,
  Post,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import {
  UpdateProgram,
  UpdateProgramDto,
  createProgramDto,
} from './dto/program.dto';
import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Get('/getPrograms')
  public async GetPrograms(@StoredUser() user: CookieUser) {
    const programWithTasks = await this.programService.getPrograms(user);
    return {
      ok: true,
      programWithTasks,
      message: 'Program with tasks has returned',
    };
  }

  @Post('/createProgram')
  public async CreateProgram(
    @Body() body: createProgramDto,
    @StoredUser() user: CookieUser,
  ) {
    const program = await this.programService.createProgram(body, user);

    return { ok: true, message: 'New Program Created', program };
  }

  @Patch('/edit/:programId')
  public async EditProgram(
    @Body() requestBody: UpdateProgram,
    @Param('programId', ParseIntPipe) programId: number,
  ) {
    const program = await this.programService.updateProgram(
      programId,
      requestBody,
    );

    return { ok: true, message: 'Porgram is updated', program };
  }

  @Delete('/delete/:programId')
  public async DeleteProgram(@Param('programId') programId) {
    const deletedProgram = await this.programService.deleteProgram(programId);
    return { ok: true, message: 'Program is deleted', program: deletedProgram };
  }

  @Post('/:programId')
  public async UpdateProgramContent(
    @Param('programId', ParseIntPipe) programId: number,
    @Body() requestBody: UpdateProgramDto[],
  ) {
    await this.programService.updateProgramWithTasks(programId, requestBody);
  }
}
