import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';


export class CreateTaskRequest {
  @ApiProperty({
    description: 'title',
    example: 'example_value'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'description',
    example: 'example_value'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'status',
    example: 'example_value'
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'priority',
    example: 'example_value'
  })
  @IsString()
  @IsNotEmpty()
  priority: string;

  @ApiProperty({
    description: 'project id',
    example: 'example_value'
  })
  @IsString()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'assignee id',
    example: 'example_value'
  })
  @IsString()
  assignee_id: string;

  @ApiProperty({
    description: 'due date',
    example: '2025-09-01T21:00:00.000Z'
  })
  @IsNotEmpty()
  due_date: Date;

}
