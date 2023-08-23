import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationEntityModule } from 'src/database/entities/notification/notification.module';
import { NotificationService } from './notification.service';
import { NotificationSocketModule } from 'src/websocket/notificationSocket/notificationSocket.module';

@Module({
  imports: [NotificationEntityModule, NotificationSocketModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
