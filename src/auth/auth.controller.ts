import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { ResponseRegisterDto } from './dto/response-register.dto';
import { ResponseSignInDto } from './dto/response-sign-in.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            accessToken: {
              type: 'string',
            },
          },
        },
      ],
    },
  })
  @Post('signIn')
  async signIn(@Body() dto: SignInDto): Promise<ResponseSignInDto> {
    return this.authService.signIn(dto);
  }

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          properties: {
            accessToken: {
              type: 'string',
            },
          },
        },
      ],
    },
  })
  @Post('signUp')
  async register(@Body() dto: CreateUserDto): Promise<ResponseRegisterDto> {
    return this.authService.registration(dto);
  }
}
