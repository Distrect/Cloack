import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskEntityModule } from 'src/database/entities/task/task.module';
import { CookieChecker } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { JwtAuthModule } from 'src/utils/jwt/jwt.module';

@Module({
  imports: [TaskEntityModule, JwtAuthModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieChecker).forRoutes('task/createTask');
  }
}
