import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class ResponseSignInDto {
  @ApiProperty()
  jwtToken: string;

  @ApiProperty()
  user: User;
}
