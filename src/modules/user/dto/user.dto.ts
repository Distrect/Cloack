import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export interface IUserLogin {
  email?: string;
  password?: string;
}

export class registerDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public passwordAgain: string;
}

export class authenticateDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public authCode: number;
}
