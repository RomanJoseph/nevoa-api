import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyUserRequest {
  @ApiProperty({ example: 'John Doe', description: `User's full name` })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: `User's email address` })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: `User's password (min 6 characters)` })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
