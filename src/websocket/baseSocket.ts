import { CookieUser } from './../middleware/cookieMiddleware/cookie.middleware';
import { UnauthorizedException, Inject, Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { extractCookie } from 'src/util';
import { ClientStorageService } from './clientStorage/clientStorage.service';
import { JwtAuthService } from 'src/services/jwt/jwt.service';

@Injectable()
export class BaseSocket
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly css: ClientStorageService;
  private readonly jas: JwtAuthService;
  private readonly serviceName: string;

  @Inject(ClientStorageService) private x;

  constructor(
    css: ClientStorageService,
    jas: JwtAuthService,
    socketServiceName: string,
  ) {
    this.css = css;
    this.jas = jas;
    this.serviceName = socketServiceName;
  }

  public afterInit(server: Server) {
    console.log(
      this.serviceName + ' Socket has been created and ready to serve',
    );
  }

  public async handleConnection(client: Socket) {
    console.log(client.handshake.headers?.cookie);
    const authCookie = extractCookie(
      'authentication',
      client.handshake.headers?.cookie,
    );

    if (!authCookie) {
      // this.sendError(client, new UnauthorizedException());
      client._error(new UnauthorizedException());
      return;
      // throw ;
    }

    const user: CookieUser = await this.jas.verifyToken(authCookie);

    this.css.saveClient(user.userId, { user, client });
    client.emit('birikikelime', 'dsadsadsad');
  }

  public async handleDisconnect(client: Socket) {
    const authCookie = extractCookie(
      'authorization',
      client.handshake.headers?.cookie,
    );

    if (!authCookie) return;

    const { userId } = await this.jas.verifyToken(authCookie);
    this.css.deleteClient(userId);
  }
}

/*
  public afterInit(server: Server) {
    this.logger.log('Message Socket has been created and ready to serve');
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
*/
// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect

/*
  public afterInit(server: Server) {
    this.logger.log('Notification Socket has been created and ready to serve');
  }

  public async handleConnection(client: Socket) {
    console.log(client.handshake.headers?.cookie);
    const authCookie = extractCookie(
      'authentication',
      client.handshake.headers?.cookie,
    );

    if (!authCookie) {
      // this.sendError(client, new UnauthorizedException());
      client._error(new UnauthorizedException());
      return;
      // throw ;
    }

    const user: CookieUser = await this.jwtService.verifyToken(authCookie);

    this.clientStorageService.saveClient(user.userId, { user, client });
    client.emit('birikikelime', 'dsadsadsad');
  }

  public async handleDisconnect(client: Socket) {
    const authCookie = extractCookie(
      'authorization',
      client.handshake.headers?.cookie,
    );

    if (!authCookie) return;

    const { userId } = await this.jwtService.verifyToken(authCookie);
    this.clientStorageService.deleteClient(userId);
  }
*/

// implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// import { extractCookie } from 'src/util';
