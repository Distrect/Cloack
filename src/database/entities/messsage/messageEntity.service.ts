import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

interface SaveMessage {
  userId: number;
  friendId: number;
  friendshipId: number;
  message: string;
}

@Injectable()
export class MessageEntityService {
  constructor(
    @Inject('messageRepository') private messageRepository: Repository<Message>,
  ) {}

  public async saveMessage(params: SaveMessage) {
    const newMessage = this.messageRepository.create({
      friendship: { friendshipId: params.friendshipId },
      from: params.userId,
      to: params.friendId,
      message: params.message,
    });

    return await this.save(newMessage);
  }

  private async save(message: Message) {
    return await this.messageRepository.save(message);
  }
}
