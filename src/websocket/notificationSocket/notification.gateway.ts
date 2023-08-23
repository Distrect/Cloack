import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from 'src/utils/jwt/jwt.service';
import { extractCookie } from 'src/util';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { NotificationEvent } from 'src/event/notification.event';
import { NotificationEntityService } from 'src/database/entities/notification/notification.service';
import { Observable, of } from 'rxjs';

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
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(NotificationGateway.name);
  private readonly Clients = new Map<number, ClientMap>();

  @WebSocketServer()
  private server: Server;

  constructor(
    private jwtService: JwtAuthService,
    private notificationRepository: NotificationEntityService,
  ) {}

  public afterInit(server: Server) {
    this.logger.log('Notification Socket has been created and ready to serve');
  }

  public async handleConnection(client: Socket) {
    const clientId = client.id;
    const authCookie = extractCookie(
      'authentication',
      client.handshake.headers?.cookie,
    );

    console.log(authCookie);
    if (!authCookie) {
      this.sendError(client, new UnauthorizedException());
      return;
    }

    const user: CookieUser = await this.jwtService.verifyToken(authCookie);

    this.Clients.set(user.userId, { user, client });
    client.emit('birikikelime', 'dsadsadsad');
  }

  public async handleDisconnect(client: Socket) {
    const authCookie = extractCookie(
      'authorization',
      client.handshake.headers?.cookie,
    );
    const { userId } = await this.jwtService.verifyToken(authCookie);
    this.Clients.delete(userId);
  }

  public sendError(client: Socket, error: Error) {
    client.emit('error', error);
  }

  public sendNotificationToClient(
    userId: number,
    notification: NotificationEvent, //değiştir
  ) {
    if (!this.Clients.has(userId)) return;

    const { client } = this.Clients.get(userId);

    client.emit('notificaiton', notification);
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
}
