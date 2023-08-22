import {
  Controller,
  Post,
  Body,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { FriendShipService } from './friendShip.service';
import {
  addFriendDto,
  answerFriendshipBody,
  searchDto,
} from './dto/friendship.dto';

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

  @Get('/getFrienshipRequests')
  public async GetFriendshipRequests(@StoredUser() user: CookieUser) {
    const friendshipRequests =
      await this.friendShipService.getFriendShipRequests(user.userId);
    return {
      ok: true,
      message: 'Friendship request succesfully retrieved',
      friendshipRequests,
    };
  }

  @Post('/answerFriendshipRequest/:friendId')
  public async AnswerFrirendshipRequest(
    @Body() requestBody: answerFriendshipBody,
    @StoredUser() user: CookieUser,
    @Param('friendId', ParseIntPipe) frienId: number,
  ) {
    const result = await this.friendShipService.answerFriendshipRequest(
      requestBody.friendshipId,
      requestBody.answer,
      user,
      frienId,
    );

    return { ok: true, message: 'Succesfully answered to friendship' };
  }
}
