import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUserLogin } from './dto/user.dto';
import { UserEntityService } from 'src/database/entities/user/user.service';
import { CryptoUtil } from 'src/utils/crypto.util';
import { JwtAuthService } from 'src/utils/jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserEntityService)
    private userEntityService: UserEntityService,
    private jwtService: JwtAuthService,
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

    const signed = await this.jwtService.createToken({ ...user });

    return signed;
  }
}
