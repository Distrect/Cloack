import { CookieUser } from './../../middleware/cookieMiddleware/cookie.middleware';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUserLogin, authenticateDto, registerDto } from './dto/user.dto';
import { UserEntityService } from 'src/database/entities/user/user.service';
import { CryptoUtil } from 'src/utils/crypto.util';
import { JwtAuthService } from 'src/services/jwt/jwt.service';
import * as moment from 'moment';
import { MailService } from 'src/services/mailer/mail.service';
import { User } from 'src/database/entities/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserEntityService)
    private userEntityService: UserEntityService,
    private jwtService: JwtAuthService,
    private mailService: MailService,
  ) {}

  public async logUser(userDto: IUserLogin) {
    const { email, password } = userDto;

    const user = await this.userEntityService.findUser({
      email: email,
    });

    console.log(CryptoUtil.generateRandomHex(password), user.password);

    // if (CryptoUtil.generateRandomHex(password) !== user.password) {
    //   throw new HttpException('Password is wrong', HttpStatus.UNAUTHORIZED);
    // }

    const signed = await this.jwtService.createToken(
      { ...user },
      { expiresIn: '1d' },
    );
    const refresh = await this.jwtService.createToken(
      { ...user },
      { expiresIn: '2d', algorithm: 'HS512' },
    );

    return [signed, refresh];
  }

  public async registerUser(registerUser: registerDto) {
    const createdUser = await this.userEntityService.createUser(registerUser);

    if (createdUser.digits) {
      if (createdUser.isAuthenticated)
        throw new HttpException('User already exists', HttpStatus.CONFLICT);

      const credentials = createdUser.digits;
      const todayDate = new Date();

      if (todayDate.getTime() < credentials.exprationDate.getTime()) {
        return {
          message:
            'Please enter your authentication code was sent to your email',
        };
      } else {
        return await this.refreshUser(createdUser);
      }
    }

    const randomDigits = Math.floor(Math.random() * 1000000);
    const currentDate = moment();

    createdUser.digits = {
      digits: randomDigits,
      exprationDate: currentDate.add(1, 'day').toDate(),
    };

    const result = await Promise.all([
      this.userEntityService.saveUser(createdUser),
      this.mailService.sendEmailMail('email', randomDigits, createdUser.email),
    ]);

    return { message: 'Authentication code was sent to your email.' };
  }

  private async refreshUser(user: User) {
    //burada hata var
    const newRandomDigits = Math.floor(Math.random() * 1000000);
    const newToday = moment();

    user.digits = {
      digits: newRandomDigits,
      exprationDate: newToday.add(1, 'day').toDate(),
    };

    await Promise.all([
      this.userEntityService.saveUser(user),
      this.mailService.sendEmailMail('email', newRandomDigits, user.email),
    ]).catch((err) => console.log('refresh', err));

    return {
      message: `New authentication code is sent to ${user.email}`,
    };
  }

  public async AuthenticateUser(requetsBody: authenticateDto) {
    const user = await this.userEntityService.findUser({
      email: requetsBody.email,
    });

    const {
      digits: { exprationDate },
    } = user;

    if (user.isAuthenticated)
      throw new HttpException(
        'You already authenticated. Please leave here',
        HttpStatus.CONFLICT,
      );

    const todayDate = new Date();
    const expDate = new Date(exprationDate);

    if (expDate.getTime() <= todayDate.getTime()) {
      return await this.refreshUser(user);
    }

    if (requetsBody.authenticationCode !== user.digits.digits) {
      throw new HttpException(
        'Wrong Authentication Code',
        HttpStatus.BAD_REQUEST,
      );
    }

    user.isAuthenticated = true;
    await this.userEntityService.saveUser(user);

    return { message: 'You are now clear to engage' };
  }

  public async getProfile(user: CookieUser) {
    return this.userEntityService.findUser({ userId: user.userId });
  }
  public async updateUser(user: CookieUser, params: any) {
    return this.userEntityService.findUser({ userId: user.userId });
  }
}

/*
      if (todayDate.getTime() >= credentials.exprationDate.getTime()) {
        const newRandomDigits = Math.floor(Math.random() * 1000000);
        const newToday = moment();

        createdUser.digits = {
          digits: newRandomDigits,
          exprationDate: newToday.add(1, 'day').toDate(),
        };

        await Promise.all([
          this.userEntityService.saveUser(createdUser),
          this.mailService.sendEmailMail(
            'email',
            newRandomDigits,
            createdUser.email,
          ),
        ]);

        return {
          message: `New authentication code is sent to ${createdUser.email}`,
        };
      }*/
