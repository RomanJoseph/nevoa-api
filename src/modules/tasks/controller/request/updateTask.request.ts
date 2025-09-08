import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskRequest {
  @ApiProperty({
    description: 'title',
    example: 'example_value',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'description',
    example: 'example_value',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'status',
    example: 'example_value',
  })
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty({
    description: 'priority',
    example: 'example_value',
  })
  @IsString()
  @IsOptional()
  priority: string;

  @ApiProperty({
    description: 'project id',
    example: 'example_value',
  })
  @IsString()
  @IsOptional()
  project_id: string;

  @ApiProperty({
    description: 'assignee id',
    example: 'example_value',
  })
  @IsOptional()
  @IsString()
  assignee_id: string;

  @ApiProperty({
    description: 'due date',
    example: '2025-09-01T21:00:00.000Z',
  })
  @IsOptional()
  due_date: Date;
}
