import { ProgramModule } from './modules/program/program.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { FriendShipModule } from './modules/friendship/friendShip.module';
import { CookieChecker } from './middleware/cookieMiddleware/cookie.middleware';
import { JwtAuthModule } from './services/jwt/jwt.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CountdownSessionModule } from './modules/countdownsession/countdownSession.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { NotificationSocketModule } from './websocket/notificationSocket/notificationSocket.module';
import { LoggerModule } from 'nestjs-pino';
import { MessageSocketModule } from './websocket/meesageSocket/messageSocket.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({ context: 'HTTP' }),
        transport: {
          target: 'pino-pretty',

          options: { singleLine: true, colorize: true },
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TagModule,
    UserModule,
    TaskModule,
    JwtAuthModule,
    ProgramModule,
    CalendarModule,
    FriendShipModule,
    MessageSocketModule,
    CountdownSessionModule,
    NotificationSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CookieChecker)
      .exclude(
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/register', method: RequestMethod.POST },
        { path: 'user/authenticate', method: RequestMethod.POST },
      )
      .forRoutes('*');
    // consumer.apply(CookieChecker).exclude('user').forRoutes('*');
  }
}
