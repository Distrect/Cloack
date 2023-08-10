import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import validate from 'deep-email-validator';

@Injectable()
export class EmailChecker implements NestMiddleware {
  public async use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const validatedEmail = await validate({
      validateSMTP: false,
      email: body?.email,
    });

    //fieldlara göre hata döndğren error classı gerekli

    // if (true) {
    //   throw new Error('anan');
    // }

    next();
  }
}
