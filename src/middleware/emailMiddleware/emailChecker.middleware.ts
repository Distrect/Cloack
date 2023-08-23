import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import validate from 'deep-email-validator';
import { CustomHttpException } from 'src/error/allErros';

@Injectable()
export class EmailChecker implements NestMiddleware {
  public async use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    console.log('body', body, req.body);
    const validatedEmail = await validate({
      validateSMTP: false,
      email: body?.email,
    });

    if (validatedEmail.valid === false) {
      throw new CustomHttpException('Invalid fields', 400, [
        { field: 'email' },
      ]);
    }

    next();
  }
}
