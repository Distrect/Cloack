/* eslint-disable @typescript-eslint/ban-types */
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomHttpException } from 'src/error/allErros';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    console.log('Metadata', metatype, value);

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const formattedErrors = this.formatErrors(errors);
      throw new CustomHttpException(
        'Fields has errors',
        HttpStatus.BAD_REQUEST,
        formattedErrors,
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors.reduce((acc, err) => {
      const { property } = err;
      const constraints = Object.values(err.constraints);
      acc[property] = constraints[0];
      return acc;
    }, {});
    /* return errors.reduce((acc, error) => {
      for (const key in error.constraints) {
        if (error.constraints.hasOwnProperty(key)) {
          acc[key] = error.constraints[key];
        }
      }
      return acc;
    }, {});*/
  }
}
