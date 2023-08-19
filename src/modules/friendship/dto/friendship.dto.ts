import { IsNotEmpty } from 'class-validator';

enum type {
  ADD = 1,
  REMOVE = 0,
}

export class searchDto {
  @IsNotEmpty()
  public searchstring: string;

  public skip: number;
}

export class addFriendDto {
  @IsNotEmpty()
  public friendUserId: number;

  @IsNotEmpty()
  public type: type;
}
