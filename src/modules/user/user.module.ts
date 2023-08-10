import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserEntityModule } from 'src/database/entities/user/user.module';
import { userProvider } from 'src/database/entities/user/user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailChecker } from 'src/middleware/emailMiddleware/emailChecker.middleware';
import { JwtAuthModule } from 'src/utils/jwt/jwt.module';

@Module({
  imports: [DatabaseModule, UserEntityModule, JwtAuthModule],
  exports: [],
  controllers: [UserController],
  providers: [...userProvider, UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmailChecker).forRoutes('user/login');
  }
}
