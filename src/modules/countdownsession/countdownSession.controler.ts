import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CountdownSessionService } from './countdownSession.service';

import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';
import {
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
    const sessionWtihProgramandTasks =
      await this.countdownSessionService.createSession(user, requestBody);

    return {
      ok: true,
      message: 'New program session has been created',
      programSession: sessionWtihProgramandTasks,
    };
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
}
