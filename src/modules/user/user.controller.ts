import { Controller, Post, Body, Get, Res, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { authenticateDto, registerDto } from './dto/user.dto';
import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';

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
    const oneDay = 1 * 24 * 60 * 60 * 1000;

    const [token, refresh] = await this.userService.logUser(userDto);
    res.cookie('authentication', token, { maxAge: oneDay });
    // res.cookie('resfresh', refresh, { maxAge: 2 * oneDay });
    return { ok: true, message: 'You are succesfully authortized' };
  }

  @Post('/authenticate')
  public async Authenticate(@Body() authenticateBody: authenticateDto) {
    console.log('dsadsa');
    const response = await this.userService.AuthenticateUser(authenticateBody);
    return { ok: true, ...response };
  }

  @Post('/logout')
  public async Logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authentication');
    return { ok: true, message: 'Use succesfully logout' };
  }

  @Get('/profile')
  public async GetProfile(@StoredUser() user: CookieUser) {
    const profile = await this.userService.getProfile(user);
    return {
      ok: true,
      message: 'User profile has been suessfully retrieved',
      profile,
    };
  }
  @Patch('/updatepofile')
  public async PatchGetProfile(
    @StoredUser() user: CookieUser,
    @Body() requestBody: any,
  ) {
    const profile = await this.userService.updateUser(user, requestBody);
    return {
      ok: true,
      message: 'User profile has been suessfully updated',
      profile,
    };
  }
}
