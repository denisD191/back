import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 25)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 30)
  password: string;
}
