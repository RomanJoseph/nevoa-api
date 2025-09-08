import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateProjectRequest {
  @ApiProperty({
    description: 'name',
    example: 'example_value',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'description',
    example: 'example_value',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'status',
    example: 'example_value',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'priority',
    example: 'example_value',
  })
  @IsString()
  @IsNotEmpty()
  priority: string;

  @ApiProperty({
    description: 'start date',
    example: '2025-09-01T21:00:00.000Z',
  })
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    description: 'end date',
    example: '2025-09-01T21:00:00.000Z',
  })
  @IsNotEmpty()
  end_date: Date;
}
