import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProgramEntityModule } from 'src/database/entities/program/programEntity.module';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { CookieChecker } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { JwtAuthModule } from 'src/utils/jwt/jwt.module';

@Module({
  imports: [ProgramEntityModule, JwtAuthModule],
  exports: [],
  providers: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieChecker)
      .forRoutes('program/deneme', 'program/createProgram');
  }
}
