import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserEntityModule } from 'src/database/entities/user/user.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailChecker } from 'src/middleware/emailMiddleware/emailChecker.middleware';
import { JwtAuthModule } from 'src/services/jwt/jwt.module';
import { MailModule } from 'src/services/mailer/mail.module';

@Module({
  imports: [UserEntityModule, JwtAuthModule, MailModule],
  exports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmailChecker).forRoutes('user/login', 'user/register');
  }
}
