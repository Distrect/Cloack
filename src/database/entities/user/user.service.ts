import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  public async searchUser(params: string[], userId: number, skip: number = 0) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.receiveFriend',
        'friendship',
        'friendship.sender = :userId',
        { userId },
      )
      .addSelect([
        `MATCH(user.name) AGAINST (:searchTerms IN BOOLEAN MODE) AS nameRelevance`,
        `MATCH(user.lastname) AGAINST (:searchTerms IN BOOLEAN MODE) AS lastnameRelevance`,
        `MATCH(user.fullname) AGAINST (:searchTerms IN NATURAL LANGUAGE MODE) AS fullnameRelevance`,
      ])
      .where(
        `MATCH(user.name) AGAINST (:searchTerms IN BOOLEAN MODE) OR ` +
          `MATCH(user.lastname) AGAINST (:searchTerms IN BOOLEAN MODE) OR ` +
          `MATCH(user.fullname) AGAINST (:searchTerms IN NATURAL LANGUAGE MODE)`,
      )
      .setParameter('searchTerms', params.join(' '))
      .orderBy('nameRelevance', 'DESC')
      .addOrderBy('lastnameRelevance', 'DESC')
      .addOrderBy('fullnameRelevance', 'DESC')
      .limit(2)
      .offset(skip * 2)
      .getMany();

    // return await this.userRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect(
    //     'user.receiveFriend',
    //     'friendship',
    //     'friendship.sender = :userId',
    //     { userId },
    //   )
    //   .where(`MATCH(user.name) AGAINST ('${params.join(' ')} IN BOOLEAN MODE')`)
    //   .orWhere(
    //     `MATCH(user.lastname) AGAINST ('${params.join(' ')} IN BOOLEAN MODE')`,
    //   )
    //   .orWhere(
    //     `MATCH(user.fullname) AGAINST ('${params.join(
    //       ' ',
    //     )} IN NATURAL LANGUAGE MODE')`,
    //   )
    //   .getMany();
  }
}

/* params
          .map((param, i) => {
            const paramName = `param${i}`;
            return `(user.name  LIKE :${paramName} or user.lastname  LIKE :${paramName})`;
          })
          .join(' OR '),
        params.reduce((acc, val, i) => {
          const paramName = `param${i}`;
          acc[paramName] = `%${val}%`;
          return acc;
        }, {}), */

/*

[
          `(CONCAT(user.name," ",user.lastname) LIKE :param1)`,
          `(CONCAT(user.name,user.lastname) LIKE :param2)`,
        ].join(' OR '),
        {
          param1: params.join(''),
          param2: params.join(' '),
        },
        */
