import { Injectable, Logger } from '@nestjs/common';

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from 'src/services/jwt/jwt.service';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { NotificationEvent } from 'src/event/notification.event';
import { NotificationEntityService } from 'src/database/entities/notification/notification.service';
import { ClientStorageService } from '../clientStorage/clientStorage.service';
import { BaseSocket } from '../baseSocket';

const configService = new ConfigService();

interface ClientMap {
  user: CookieUser;
  client: Socket;
}

interface NotificationSee {
  notificationId: number;
  seeDate: Date;
}
@Injectable()
@WebSocketGateway(8081, {
  cookie: true,
  cors: {
    origin: configService.get<string>('CLIENT_HOST'),
    credentials: true,
  },
})
export class NotificationGateway extends BaseSocket {
  private readonly logger = new Logger(NotificationGateway.name);
  private readonly Clients = new Map<number, ClientMap>();

  @WebSocketServer()
  private server: Server;

  constructor(
    private clientStorageService: ClientStorageService,
    private jwtService: JwtAuthService,
    private notificationRepository: NotificationEntityService,
  ) {
    super(clientStorageService, jwtService, NotificationGateway.name);
  }

  public sendError(client: Socket, error: Error) {
    client.emit('error', error);
  }

  public sendNotificationToClient(
    userId: number,
    notification: NotificationEvent, //değiştir
  ) {
    const user = this.clientStorageService.getClient(userId);

    if (!user) return;

    user.client.emit('notificaiton', notification);
  }

  @SubscribeMessage('seeNotifictaion')
  public async seeEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: NotificationSee,
  ) {
    await this.notificationRepository.update(payload.notificationId, {
      seenDate: payload.seeDate,
    });

    return { seen: true };
  }
  @SubscribeMessage('deneme')
  public async deneme(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload?: NotificationSee,
  ) {
    console.log('This m y kingdom cum');
    return { seen: true };
  }
}
