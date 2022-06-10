import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('todos')
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public userId: string;

  @ApiProperty()
  @Column()
  public title: string;

  @ApiProperty()
  @Column()
  public completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
