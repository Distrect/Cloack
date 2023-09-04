import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtAuthService } from 'src/services/jwt/jwt.service';
import { TokenExpiredError } from 'jsonwebtoken';

export interface CookieUser {
  userId: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  digits: { digits: number; exprationDate: string };
  isAuthenticated: boolean;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}

interface newRequest extends Request {
  user: CookieUser;
}

//JWT Expired hatasını düzgün şekilde ilet(Sesswion Expired)

@Injectable()
export class CookieChecker implements NestMiddleware {
  constructor(private jwtService: JwtAuthService) {}

  public async use(req: newRequest, res: Response, next: NextFunction) {
    try {
      console.log('Cookie checker middleware get called');
      const cookies = req.cookies['authentication'];
      console.log('cookies', cookies);
      if (!cookies) {
        throw new UnauthorizedException();
      }

      const verified: CookieUser = await this.jwtService.verifyToken(cookies);
      console.log('verified', verified);

      const todayDate = new Date();
      console.log('today Date', todayDate);

      if (verified.exp * 1000 < todayDate.getTime()) {
        throw new HttpException(
          'Your session has expired. Please log in again',
          HttpStatus.UNAUTHORIZED,
        );
      }

      req.user = verified;

      next();
    } catch (error) {
      console.log(error);
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException();
      } else {
        throw error;
      }
    }
  }
}

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // const cookie = request.cookies;
    return data ? request.cookies?.[data] : request.cookies;
  },
);

export const StoredUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  return user;
});
