import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateProjectRequest {
  @ApiProperty({
    description: 'name',
    example: 'example_value',
  })
  @IsString()
  @IsOptional()
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
    description: 'start date',
    example: '2025-09-01T21:00:00.000Z',
  })
  @IsOptional()
  start_date: Date;

  @ApiProperty({
    description: 'end date',
    example: '2025-09-01T21:00:00.000Z',
  })
  @IsOptional()
  end_date: Date;
}
