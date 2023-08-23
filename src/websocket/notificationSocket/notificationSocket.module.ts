import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { JwtAuthModule } from 'src/utils/jwt/jwt.module';
import { NotificationEntityModule } from 'src/database/entities/notification/notification.module';

@Module({
  imports: [JwtAuthModule, NotificationEntityModule],
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class NotificationSocketModule {}
