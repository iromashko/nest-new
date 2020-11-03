import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Title', type: String })
  title: string;
  @IsNotEmpty()
  @ApiProperty({ description: 'Description', type: String })
  description: string;
}
