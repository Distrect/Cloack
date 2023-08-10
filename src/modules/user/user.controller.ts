import { Controller, Post, Body, Get, Res, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { IUserLogin } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  public Register(@Body() registerDto) {}

  @Post('/login')
  public async Login(
    @Body() userDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.logUser(userDto);
    res.cookie('authentication', token, { maxAge: 300000000 });
    return { ok: true, message: 'You are succesfully authortized' };
  }
}
