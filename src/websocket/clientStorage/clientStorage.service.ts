import { Injectable, Scope } from '@nestjs/common';
import { CookieUser } from './../../middleware/cookieMiddleware/cookie.middleware';
import { Socket } from 'socket.io';

interface ClientMap {
  user: CookieUser;
  client: Socket;
}

@Injectable({ scope: Scope.DEFAULT })
export class ClientStorageService {
  private readonly Clients = new Map<number, ClientMap>();

  public hasClient(userId: number): boolean {
    return this.Clients.has(userId);
  }

  public getClient(userId: number): ClientMap | false {
    if (!this.hasClient(userId)) return false;

    return this.Clients.get(userId);
  }

  public saveClient(userId: number, user: ClientMap): void | Error {
    if (!this.hasClient(userId))
      throw new Error('This client already in storage');

    this.Clients.set(userId, user);
  }

  public deleteClient(userId: number) {
    if (!this.hasClient(userId)) throw new Error('User do not exists');

    this.Clients.delete(userId);
  }
}
