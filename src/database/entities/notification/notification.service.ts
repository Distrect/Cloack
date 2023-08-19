import { Inject, Injectable } from '@nestjs/common';
import { InsertValuesMissingError, Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationEntityService {
  constructor(
    @Inject('NotificationRepository')
    private notificationRepository: Repository<Notification>,
  ) {}
}
