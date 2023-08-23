import { Controller, Post, Body, Get, Res, Inject, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { IUserLogin, authenticateDto, registerDto } from './dto/user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  public async Register(@Body() registerUser: registerDto) {
    const response = await this.userService.registerUser(registerUser);
    return { ok: true, ...response };
  }

  @Post('/login')
  public async Login(
    @Body() userDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.logUser(userDto);
    res.cookie('authentication', token, { maxAge: 300000000 });
    return { ok: true, message: 'You are succesfully authortized' };
  }

  @Post('/authenticate')
  public async Authenticate(@Body() authenticateBody: authenticateDto) {
    console.log('dsadsa');
    const response = await this.userService.AuthenticateUser(authenticateBody);
    return { ok: true, ...response };
  }

  @Post('/logout')
  public async Logout(@Res() res: Response) {
    res.clearCookie('authentication');
    return { ok: true, message: 'Use succesfully logout' };
  }
}

/*

    const userIp = req.ip.replace(/^::ffff:/, '');
    const userIpData = await fetch(
      `https://api.iplocation.net/?ip=${userIp}&format=json`,
    )
      .then((res) => res.json())
      .catch(console.error);

    console.log(userIp, userIpData);
*/
