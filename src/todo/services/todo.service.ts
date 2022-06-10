import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async getAll(userId: string) {
    return await this.todoRepository.find({
      where: { userId: userId },
    });
  }

  async create(todo: CreateTodoDto) {
    return await this.todoRepository.save(todo);
  }

  async update(id: string, todo: UpdateTodoDto) {
    return await this.todoRepository.save({ id, ...todo });
  }

  async delete(id: string) {
    await this.todoRepository.delete(id);
    return id;
  }
}
