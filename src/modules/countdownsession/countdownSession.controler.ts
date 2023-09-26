import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CountdownSessionService } from './countdownSession.service';

import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';
import {
  AddProgramToTheSession,
  AddTaskToTheSession,
  CreateTaskForProgramSession,
  DeleteSessionTaskDTO,
  DeleteSesssionProgram,
  SaveResults,
  UpdateCountdownSession,
  UpdateTask,
  createSessionBody,
  updateSessionBody,
} from './dto/countdownSession.dto';

@Controller('countdownsession')
export class CountdownSessionController {
  constructor(
    @Inject(CountdownSessionService)
    private countdownSessionService: CountdownSessionService,
  ) {}

  @Post('/createSession')
  public async CreateSession(
    @StoredUser() user: CookieUser,
    @Body() requestBody: createSessionBody,
  ) {
    const programSessionId = await this.countdownSessionService.createSession(
      user,
      requestBody,
    );

    return {
      ok: true,
      message: 'New program session has been created',
      programSession: programSessionId,
    };
  }

  @Get('/getSession/:countdownSessionId')
  public async GetCountdownSession(
    @Param('countdownSessionId', ParseIntPipe) countdonwSessionId: number,
  ) {
    const countdownSessionWithProgramAndItsTasks =
      await this.countdownSessionService.getCountdownSessionWithProgramsAndTasks(
        countdonwSessionId,
      );

    if (countdownSessionWithProgramAndItsTasks.programSessions.length === 0)
      throw new HttpException('Countdown Not Found', HttpStatus.NOT_FOUND);

    return {
      ok: true,
      message: 'RetrieveSuccessfull',
      countdownSession: countdownSessionWithProgramAndItsTasks,
    };
  }

  @Post('/deleteSessionTask')
  public async DeleteSessionTask(@Body() requestBody: DeleteSessionTaskDTO) {
    console.log('fdsfdsfddsfdfds', requestBody);
    const isDeleted = await this.countdownSessionService.deleteSessionTask(
      requestBody,
    );
    return {
      isDeleted,
      ok: true,
      message: 'Session Task is Sucessfully deleted',
    };
  }

  @Post('/deleteProgramSession')
  public async DeelteProgramSession(
    @Body() requestBody: DeleteSesssionProgram,
  ) {
    const deeltedProgramSession =
      await this.countdownSessionService.deleteSessionProgram(requestBody);

    return { ok: true, message: 'Program has been deleted' };
  }

  @Post('/updateSession')
  public async UpdateSession(@Body() requestBody: updateSessionBody) {
    const updatedSession = await this.UpdateSession(requestBody);
    return {
      ok: true,
      message: 'Session has been updated',
      session: updatedSession,
    };
  }

  @Post('/addProgramToSession/:countdownSessionId')
  public async AddProgram(
    @Body() requestBody: AddProgramToTheSession,
    @Param('countdownSessionId', ParseIntPipe) countdownSessionId: number,
  ) {
    const added = await this.countdownSessionService.addProgramToTheSession(
      countdownSessionId,
      requestBody,
    );

    return { ok: true, message: 'Anan', newSessionProgram: added };
  }
  //
  @Post('/addTask/:programSessionId')
  public async AddTask(
    @Body() requestBody: AddTaskToTheSession,
    @Param('programSessionId', ParseIntPipe) programSessionId: number,
  ) {
    const addedTask = await this.countdownSessionService.AddTaskToTheSession(
      requestBody,
      programSessionId,
    );

    return { ok: true, message: 'Anan', newSessionTask: addedTask };
  }

  @Post('createTask/:programSessionId')
  public async CreateTask(
    @Body() requestBody: CreateTaskForProgramSession,
    @Param('programSessionId', ParseIntPipe) programSessionId: number,
  ) {
    const createdTask =
      await this.countdownSessionService.createTaskForProgramSession(
        requestBody,
        programSessionId,
      );

    return { ok: true, message: 'Anan', newSessionTask: createdTask };
  }

  @Post('updateTask/:sessionTaskId')
  public async UpdateTask(
    @Body() requestBody: UpdateTask,
    @Param('sessionTaskId', ParseIntPipe) sessionTaskId: number,
  ) {
    const updated = await this.countdownSessionService.updateTask(
      requestBody,
      sessionTaskId,
    );
    return { ok: true, message: 'Updated' };
  }

  @Post('/updateCountdownSession/:countdownSessionId')
  public async UpdateCountdownSession(
    @Body() requestBody: UpdateCountdownSession,
    @Param('countdownSessionId', ParseIntPipe) countdownSessionId: number,
  ) {
    const [a, b] =
      await this.countdownSessionService.orderProgramSessionsWithTasks(
        countdownSessionId,
        requestBody,
      );
    return { ok: true, message: 'Hola' };
  }

  @Post('/saveResults/:countdownSessionId')
  public async saveEndResults(
    @Body() body: SaveResults,
    @Param('countdownSessionId', ParseIntPipe) countdownSessionId: number,
  ) {
    console.log(body);
    const score = await this.countdownSessionService.saveResults(
      body,
      countdownSessionId,
    );
    return { ok: true, message: 'Countdown Data Has Been Saved', score };
  }

  @Post('/restartCountdownSession/:countdownSessionId')
  public async RestartCountdown(
    @Param('countdownSessionId', ParseIntPipe) countdownSessionId: number,
  ) {
    await this.countdownSessionService.restartCountdownSession(
      countdownSessionId,
    );
    return { ok: true, message: 'Countdown Has Been Restarted' };
  }
}
