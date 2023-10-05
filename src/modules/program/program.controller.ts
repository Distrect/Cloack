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
  getProgramDto,
} from './dto/program.dto';
import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Post('/getPrograms')
  public async GetPrograms(
    @StoredUser() user: CookieUser,
    @Body() requestBody: getProgramDto,
  ) {
    const programWithTasks = await this.programService.getPrograms(
      user,
      requestBody,
    );
    return {
      ok: true,
      programWithTasks,
      message: 'Program with tasks has returned',
    };
  }

  @Get('/program/:programId')
  public async GetOneProgram(
    @StoredUser() user: CookieUser,
    @Param('programId', ParseIntPipe) programId: number,
  ) {
    const program = await this.programService.getProgram(user, programId);
    return {
      ok: true,
      message: 'Program has been retrieved',
      program,
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
    @StoredUser() user: CookieUser,
    @Body() requestBody: UpdateProgram,
    @Param('programId', ParseIntPipe) programId: number,
  ) {
    const program = await this.programService.updateProgram(
      user,
      programId,
      requestBody,
    );

    return { ok: true, message: 'Porgram is updated', program };
  }

  @Delete('/delete/:programId')
  public async DeleteProgram(
    @StoredUser() user: CookieUser,
    @Param('programId') programId,
  ) {
    const deletedProgram = await this.programService.deleteProgram(programId);
    return { ok: true, message: 'Program is deleted', program: deletedProgram };
  }

  @Post('/:programId')
  public async UpdateProgramContent(
    @StoredUser() user: CookieUser,
    @Param('programId', ParseIntPipe) programId: number,
    @Body() requestBody: UpdateProgramDto[],
  ) {
    await this.programService.updateProgramWithTasks(
      user,
      programId,
      requestBody,
    );
  }
}
