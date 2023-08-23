import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationEntityService {
  constructor(
    @Inject('NotificationRepository')
    private notificationRepository: Repository<Notification>,
  ) {}

  public async createNotificationForUser(userId: number, message: string) {
    const newNotification = this.notificationRepository.create({
      message,
      user: { userId },
    });
    return await this.saveNotificitaionEntity(newNotification);
  }

  public async update(notificationId: number, params: Partial<Notification>) {
    return await this.notificationRepository.update({ notificationId }, params);
  }

  private async saveNotificitaionEntity(notification: Notification) {
    return await this.notificationRepository.save(notification);
  }
}
