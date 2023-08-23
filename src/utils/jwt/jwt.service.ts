// jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CookieUser } from 'src/middleware/cookieMiddleware/cookie.middleware';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: any, options?: JwtSignOptions): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  async verifyToken(token: string): Promise<CookieUser> {
    return this.jwtService.verifyAsync(token);
  }
}
