import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationEntityModule } from 'src/database/entities/notification/notification.module';
import { NotificationService } from './notification.service';
import { UserEntityModule } from 'src/database/entities/user/user.module';

@Module({
  imports: [NotificationEntityModule],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
