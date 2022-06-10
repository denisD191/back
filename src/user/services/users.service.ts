import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { HashService } from './hash.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { FindOneOptions } from 'typeorm';
import { UsersRepository } from '../users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly repo: UsersRepository,
    private hashService: HashService,
  ) {}

  async createOne(dto: CreateUserDto): Promise<User> {
    dto.password = await this.hashService.generateHash(dto.password);
    return this.repo.save(dto);
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.repo.findOne(options);
  }
}
