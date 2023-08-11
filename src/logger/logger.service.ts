import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: string) {
    // Your custom logging logic here
    console.log(message);
  }

  error(message: string, trace: string) {
    // Your custom error logging logic here
    console.error(message, trace);
  }

  warn(message: string) {
    // Your custom warning logging logic here
    console.warn(message);
  }

  debug(message: string) {
    // Your custom debug logging logic here
    console.debug(message);
  }
}
