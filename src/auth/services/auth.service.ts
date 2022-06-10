import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/user/services/hash.service';
import { ResponseSignInDto } from '../dto/response-sign-in.dto';
import { ResponseRegisterDto } from '../dto/response-register.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { UsersRepository } from 'src/user/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async signIn(dto: SignInDto): Promise<ResponseSignInDto> {
    const user = await this.usersRepository.findOne({
      where: { username: dto.username },
    });

    const isPosswordCorrect = await this.hashService.compareHash(
      dto.password,
      user.password,
    );

    if (!user || !isPosswordCorrect) {
      throw new NotFoundException('Wrong username or password.');
    }

    const jwtToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });

    return {
      jwtToken: jwtToken,
      user: user,
    };
  }

  async registration(dto: CreateUserDto): Promise<ResponseRegisterDto> {
    const isUserAlreadyExists = await this.usersRepository.count({
      where: { username: dto.username },
    });

    if (isUserAlreadyExists > 0) {
      throw new ForbiddenException('User with this username already exist.');
    }

    const hashedPassword = await this.hashService.generateHash(dto.password);

    const newUser = await this.usersRepository.save({
      ...dto,
      password: hashedPassword,
    });

    const jwtToken = await this.jwtService.signAsync({
      sub: newUser.id,
      email: newUser.username,
    });

    return {
      jwtToken: jwtToken,
      user: newUser,
    };
  }
}
