import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  UsePipes,
  Query,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { FilterTasksDto } from './dto/filter-task.dto';
import { ValidateTaskStatus } from './pipes/validate-task-status.pipe';
import { TaskStatus } from './task-status.enum';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @ApiBody({ type: CreateTaskDto })
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get()
  @ApiBearerAuth()
  getTasks(
    @Query(ValidationPipe) filterTasksDto: FilterTasksDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterTasksDto, user);
  }

  @Get(':id')
  @ApiBearerAuth()
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ValidateTaskStatus) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }
}
