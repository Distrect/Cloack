import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';

export class NotificationEvent {
  constructor(
    public user: CookieUser,
    public toId: number,
  ) {}
}
