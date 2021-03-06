import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from './services/hash.service';
import { UsersService } from './services/users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [HashService, UsersService],
  exports: [HashService],
})
export class UsersModule {}
