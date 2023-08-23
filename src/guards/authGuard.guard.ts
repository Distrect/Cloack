import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { extractCookie } from 'src/util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();
    const clientAuthCookie = extractCookie(
      'authentication',
      client.handshake.header?.cookie,
    );

    console.log('ewqewqewqewqewqewqewqewqewqewqe');
    return clientAuthCookie ? true : false;
  }
}
