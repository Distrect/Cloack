import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './database/entities/user/user.entity';

@Injectable()
export class AppService {
  // @Inject('UserRepository')
  // private userRepository: Repository<User>;

  getHello(): string {
    return 'Hello World!';
  }
}
