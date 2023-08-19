import { Module } from '@nestjs/common';
import { notificationProvider } from './notification.provider';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationEntityService } from './notification.service';

@Module({
  imports: [DatabaseModule],
  providers: [...notificationProvider, NotificationEntityService],
  exports: [NotificationEntityService],
})
export class NotificationEntityModule {}
