import { ProgramModule } from './modules/program/program.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MyLoggerService } from './logger/logger.service';
import { ProgramTaskEntityModule } from './database/entities/programtask/programTaskEntityModule.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ProgramModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // console.log(consumer);
  }
}
