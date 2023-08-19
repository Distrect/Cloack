import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageEntityService {
  constructor(
    @Inject('messageRepository') private messageRepository: Repository<Message>,
  ) {}
}
