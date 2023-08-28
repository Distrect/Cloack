import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { JwtAuthModule } from 'src/services/jwt/jwt.module';
import { NotificationEntityModule } from 'src/database/entities/notification/notification.module';
import { ClientStorageModule } from '../clientStorage/clientStorage.module';

@Module({
  imports: [JwtAuthModule, NotificationEntityModule, ClientStorageModule],
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class NotificationSocketModule {}
