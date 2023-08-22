import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Friendship, friendShipStatus } from './friendship.entity';

@Injectable()
export class FriendShipEntityService {
  constructor(
    @Inject('FriendShipRepository')
    private friendShipRepository: Repository<Friendship>,
  ) {}

  public async getFriendShip(userId: number, friendId: number) {
    return await this.friendShipRepository.findOne({
      where: { sender: { userId }, receiver: { userId: friendId } },
    });
  }

  public async addFriend(userId: number, friendId: number) {
    const newFriendShip = this.friendShipRepository.create({
      sender: { userId },
      receiver: { userId: friendId },
      status: friendShipStatus.WAITING,
    });

    return await this.save(newFriendShip);
  }

  public async getFriendshipRequests(userId: number) {
    return await this.friendShipRepository.find({
      relations: { sender: true },
      where: {
        receiver: {
          userId,
        },
        status: friendShipStatus.WAITING,
      },
    });
  }

  public async save(entity: Friendship) {
    return await this.friendShipRepository.save(entity);
  }

  public async answerFriendshipRequest(
    friendshipId: number,
    accepted: true | false,
  ) {
    return await this.friendShipRepository
      .createQueryBuilder('friendship')
      .update({
        status: accepted
          ? friendShipStatus.APPROVED
          : friendShipStatus.DECLINED,
      })
      .where('friendship.friendshipId = friendshipId', { friendshipId })
      .execute();
  }
}
