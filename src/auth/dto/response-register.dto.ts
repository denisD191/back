import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class ResponseRegisterDto {
  @ApiProperty()
  jwtToken: string;

  @ApiProperty()
  user: User;
}
