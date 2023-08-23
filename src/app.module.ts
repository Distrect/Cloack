import { ProgramModule } from './modules/program/program.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MyLoggerService } from './logger/logger.service';
import { TagModule } from './modules/tag/tag.module';
import { FriendShipModule } from './modules/friendship/friendShip.module';
import { CookieChecker } from './middleware/cookieMiddleware/cookie.middleware';
import { JwtAuthModule } from './utils/jwt/jwt.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CountdownSessionModule } from './modules/countdownsession/countdownSession.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { NotificationSocketModule } from './websocket/notificationSocket/notificationSocket.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({ context: 'HTTP' }),
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ProgramModule,
    TagModule,
    FriendShipModule,
    CountdownSessionModule,
    CalendarModule,
    JwtAuthModule,
    NotificationSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(CookieChecker).forRoutes('*');
  }
}
