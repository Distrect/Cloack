import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { registerDto } from 'src/modules/user/dto/user.dto';
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

  public async createUser(userCredentials: registerDto) {
    const user = await this.chechkIfUserExists({
      email: userCredentials.email,
    });
    if (user) return user;
    const createdUser = this.userRepository.create({ ...userCredentials });
    return createdUser;
  }

  public async chechkIfUserExists(params) {
    return await this.userRepository.findOne({ where: { ...params } });
  }

  public async saveUser(user: User) {
    return await this.userRepository.save(user);
  }
}
