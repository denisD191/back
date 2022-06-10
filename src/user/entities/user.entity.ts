import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Todo } from 'src/todo/entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar')
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
