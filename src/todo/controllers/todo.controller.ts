import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { TodoService } from '../services';
import { CreateTodoDto } from '../dto';
import { UpdateTodoDto } from '../dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Todo } from '../entities';

//@UseGuards(JwtAuthGuard)
@ApiTags('todos')
@ApiBearerAuth('JWT')
@Controller('todos')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  // CRUD
  @ApiBody({ type: CreateTodoDto })
  @Post()
  create(@Body() todo: CreateTodoDto) {
    return this.todosService.create(todo);
  }

  @Get(':userId')
  get(@Param('userId') id: string): Promise<Todo[]> {
    return this.todosService.getAll(id);
  }

  @ApiBody({ type: UpdateTodoDto })
  @Patch()
  update(@Query('id') id: string, @Body() todo: UpdateTodoDto) {
    return this.todosService.update(id, todo);
  }

  @Delete()
  delete(@Query('id') id: string) {
    return this.todosService.delete(id);
  }
}
