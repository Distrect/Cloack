import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProgramEntityModule } from 'src/database/entities/program/programEntity.module';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { CookieChecker } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { JwtAuthModule } from 'src/services/jwt/jwt.module';
import { TaskEntityModule } from 'src/database/entities/task/task.module';
import { ProgramTaskEntityModule } from 'src/database/entities/programtask/programTaskEntityModule.module';
import { SharedEntitiesModule } from 'src/database/entities/shared/shared.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ProgramEntityModule,
    TaskEntityModule,
    ProgramTaskEntityModule,
    JwtAuthModule,
    SharedEntitiesModule,
  ],
  exports: [],
  providers: [ProgramService],
  controllers: [ProgramController],
})
export class ProgramModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieChecker).forRoutes('program/**');
    // .forRoutes('program/deneme', 'program/createProgram');
  }
}
