import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
  public email: string;
  @ApiProperty()
  @IsNotEmpty()
  public password: string;
}

export class authenticateDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public authenticationCode: number;
}
