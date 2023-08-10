import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
//import { IUserLogin } from 'src/modules/user/dto/user.dto';

@Injectable()
export class UserEntityService {
  constructor(
    @Inject('UserRepository') private userRepository: Repository<User>,
  ) {}

  public async findUser(params: any): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { ...params },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  public async createUser(userCredenitlas: any) {
    const createdUser = this.userRepository.create();
  }
}
