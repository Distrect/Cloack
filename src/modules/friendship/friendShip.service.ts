import { Injectable, Inject } from '@nestjs/common';
import { FriendShipEntityService } from 'src/database/entities/friendship/friendShipEntity.service';
import { UserEntityService } from 'src/database/entities/user/user.service';
import { addFriendDto, searchDto } from './dto/friendship.dto';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';
import { friendShipStatus } from 'src/database/entities/friendship/friendship.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { FriendshipAcceptedEvent } from 'src/event/notification.event';

@Injectable()
export class FriendShipService {
  constructor(
    @Inject(FriendShipEntityService)
    private friendShipEntityService: FriendShipEntityService,
    @Inject(UserEntityService) private userEntityService: UserEntityService,
    private eventEmitter: EventEmitter2,
  ) {}

  public async searchUser(searchParams: searchDto, user: CookieUser) {
    const splittedString = searchParams.searchstring.split(' ');
    const result = await this.userEntityService.searchUser(
      splittedString,
      user.userId,
      searchParams.skip,
    );
    return result;
  }

  public async addFriend(user: CookieUser, friend: addFriendDto) {
    const friendShip = await this.friendShipEntityService.getFriendShip(
      user.userId,
      friend.friendUserId,
    );

    if (!friendShip) {
      const newFriendShip = await this.friendShipEntityService.addFriend(
        user.userId,
        friend.friendUserId,
      );
      console.log(newFriendShip);
      this.eventEmitter.emit('notification.friendship');
      return true;
    }

    friendShip.status = friendShipStatus.DECLINED;
    await this.friendShipEntityService.save(friendShip);
    return false;
  }

  public async getFriendShipRequests(userId: number) {
    return await this.friendShipEntityService.getFriendshipRequests(userId);
  }

  public async answerFriendshipRequest(
    friendshipId: number,
    answer: true | false,
    user: CookieUser,
    friendId: number,
  ) {
    const result = await this.friendShipEntityService.answerFriendshipRequest(
      friendshipId,
      answer,
    );

    if (answer) {
      const friendshipEvent = new FriendshipAcceptedEvent(user, friendId);
      this.eventEmitter.emit('notification', friendshipEvent);
    }

    return result;
  }
}
