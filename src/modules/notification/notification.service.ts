import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotificationEntityService } from 'src/database/entities/notification/notification.service';
import { NotificationEvent } from 'src/event/notification.event';

@Injectable()
export class NotificationService {
  constructor(
    private eventEmitter: EventEmitter2,
    private notifictaionEntityService: NotificationEntityService,
  ) {}

  @OnEvent('notification')
  public async saveNotificationToTheUser(payload: NotificationEvent) {
    const userId = payload.userId;
    const message = payload.message;

    const newNotification =
      await this.notifictaionEntityService.createNotificationForUser(
        userId,
        message,
      );
  }
}
