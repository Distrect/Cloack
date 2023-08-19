import { Controller, Post, Body } from '@nestjs/common';
import { FriendShipService } from './friendShip.service';
import { addFriendDto, searchDto } from './dto/friendship.dto';

import {
  CookieUser,
  StoredUser,
} from 'src/middleware/cookieMiddleware/cookie.middleware';

@Controller('friendship')
export class FriendShipController {
  constructor(
    private friendShipService: FriendShipService, // private userService: UserService,
  ) {}

  @Post('/search')
  public async SearchFriends(
    @Body() requestBody: searchDto,
    @StoredUser() user: CookieUser,
  ) {
    const users = await this.friendShipService.searchUser(requestBody, user);
    return { ok: true, message: ' Users retrieved', users };
  }

  @Post('/sendFriendShipRequest')
  public async SendFriendShipRequest(
    @StoredUser() user: CookieUser,
    requestBody: addFriendDto,
  ) {
    const result = await this.friendShipService.addFriend(user, requestBody);

    return {
      ok: true,
      message: result
        ? 'Friendship request is sended'
        : 'Frindship was terminated',
    };
  }
}
