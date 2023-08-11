import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { createParamDecorator, ExecutionContext, Req } from '@nestjs/common';
import { CustomHttpException } from 'src/error/allErros';
import { JwtAuthService } from 'src/utils/jwt/jwt.service';

interface User extends Request {
  user: any;
}

@Injectable()
export class CookieChecker implements NestMiddleware {
  constructor(private jwtService: JwtAuthService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies['authentication'];
    if (!cookies) {
      throw new UnauthorizedException();
    }

    const verified = await this.jwtService.verifyToken(cookies);

    const todayDate = new Date();

    if (verified.exp * 1000 < todayDate.getTime()) {
      throw new HttpException(
        'Your session has expired. Please log in again',
        HttpStatus.UNAUTHORIZED,
      );
    }

    (req as User).user = verified;

    next();
  }
}

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cookie = request.cookies;
    return data ? request.cookies?.[data] : request.cookies;
  },
);

export const StoredUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  return user;
});
