import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';

export enum EventType {
  FRIENDSHIP_ACCEPTED = 'Friendship Accepted',
}

export abstract class NotificationEvent {
  public userId: number;
  public message: string;
  public eventType: EventType;
}

export class FriendshipAcceptedEvent extends NotificationEvent {
  public userId: number;
  public message: string;
  public eventType: EventType = EventType.FRIENDSHIP_ACCEPTED;

  constructor(user: CookieUser, userId: number) {
    super();
    this.userId = userId;
    this.message = `${
      user.name + ' ' + user.lastname
    } has accepted your friendship request`;
  }
}
