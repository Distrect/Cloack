import { HttpException, HttpStatus } from '@nestjs/common';

export enum ProgramErrors {
  NO_TASK_ERROR = 'No Task Error',
}

export class CustomHttpException extends HttpException {
  public fields: any;
  public type: ProgramErrors;

  constructor(
    message: string,
    status: HttpStatus,
    fields: any,
    type?: ProgramErrors,
  ) {
    super(message, status);
    this.fields = fields;
    this.type = type;
  }
}

// class GeneralError extends Error {
//   constructor(message) {
//     super();
//     this.message = message;
//   }
// }

// class NotFoundError extends GeneralError {}
