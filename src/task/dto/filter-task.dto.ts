import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTasksDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  @ApiProperty({ description: 'Task status', type: String })
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'Search string', type: String })
  search: string;
}
