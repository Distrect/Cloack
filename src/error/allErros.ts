import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  public fields: any;
  constructor(message: string, status: HttpStatus, fields: any) {
    super(message, status);
    this.fields = fields;
  }
}

// class GeneralError extends Error {
//   constructor(message) {
//     super();
//     this.message = message;
//   }
// }

// class NotFoundError extends GeneralError {}
