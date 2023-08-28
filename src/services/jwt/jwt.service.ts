// jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: any, options?: JwtSignOptions): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  async verifyToken(
    accesToken: string,
    // refreshToken: string,
  ): Promise<CookieUser> {
    const user = this.jwtService.verifyAsync<CookieUser>(accesToken);

    return user;
  }
}
