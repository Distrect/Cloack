import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getHello() {
    return '<h1>Selam</h1>';
  }

  @Post('/login')
  public async login(@Body() loginDto) {
    console.log(loginDto);
  }
}
