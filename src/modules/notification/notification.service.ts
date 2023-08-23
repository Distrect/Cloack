import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Notification } from 'src/database/entities/notification/notification.entity';
import { NotificationEntityService } from 'src/database/entities/notification/notification.service';
import { NotificationEvent } from 'src/event/notification.event';
import { NotificationGateway } from 'src/websocket/notificationSocket/notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private eventEmitter: EventEmitter2,
    private notifictaionEntityService: NotificationEntityService,
    private notificationSocket: NotificationGateway,
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

    this.notificationSocket.sendNotificationToClient(userId, payload);
  }

  public async updateNotification(
    notifiaitonId: number,
    params: Partial<Notification>,
  ) {
    return await this.notifictaionEntityService.update(notifiaitonId, params);
  }
}
