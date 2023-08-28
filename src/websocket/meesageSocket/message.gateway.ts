import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';

import { JwtAuthService } from 'src/services/jwt/jwt.service';

import { ClientStorageService } from '../clientStorage/clientStorage.service';
import { BaseSocket } from '../baseSocket';
import { MessageEntityService } from 'src/database/entities/messsage/messageEntity.service';

const configService = new ConfigService();

interface MessagePayload {
  userId: number;
  friendId: number;
  friendshipId: number;
  message: string;
  sendDate: Date;
}

@Injectable()
@WebSocketGateway(8050, {
  cookie: true,
  cors: {
    origin: configService.get<string>('CLIENT_HOST'),
    credentials: true,
  },
})
export class MessageGateway extends BaseSocket {
  private readonly logger = new Logger(MessageGateway.name);

  @WebSocketServer()
  private server: Server;

  constructor(
    private messagentityService: MessageEntityService,
    private clientStorageService: ClientStorageService,
    private jwtService: JwtAuthService,
  ) {
    super(clientStorageService, jwtService, MessageGateway.name);
  }

  @SubscribeMessage('sendMessage')
  public async sendMessage(
    @ConnectedSocket() client: Socket,
    payload: MessagePayload,
  ) {
    const { userId } = payload;
    const user = this.clientStorageService.getClient(userId);

    const message = await this.messagentityService.saveMessage(payload);

    if (user) {
      user.client.emit('getMessage', message);
    }

    return { ok: true, message };
  }

  @SubscribeMessage('getMessage')
  public async getMessage() {}

  public sendError(client: Socket, error: Error) {
    client.emit('error', error);
  }
}
