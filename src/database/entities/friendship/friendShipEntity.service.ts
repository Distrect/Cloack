import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Friendship } from './friendship.entity';

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
    const newFriendShip = await this.friendShipRepository.create({
      sender: { userId },
      receiver: { userId: friendId },
    });

    return await this.save(newFriendShip);
  }

  public async save(entity: Friendship) {
    return await this.friendShipRepository.save(entity);
  }
}
