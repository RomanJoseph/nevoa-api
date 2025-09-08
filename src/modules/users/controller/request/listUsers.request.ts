import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { IsEqualLength } from 'src/shared/validators/is-equal-length.validator';

export class ListUsersRequest {
  @ApiProperty({ description: 'Page number', required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({ description: 'Items per page', required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  per_page?: number;

  @ApiProperty({ description: 'Fields to filter by (comma-separated)', required: false })
  @IsOptional()
  @IsString()
  @IsEqualLength('filterType', { message: 'filterBy and filterType must have the same number of elements' })
  filterBy?: string;

  @ApiProperty({ description: 'Filter types (comma-separated: equals, contains, in)', required: false })
  @IsOptional()
  @IsString()
  @IsEqualLength('filterValue', { message: 'filterType and filterValue must have the same number of elements' })
  filterType?: string;

  @ApiProperty({ description: 'Filter values (comma-separated)', required: false })
  @IsOptional()
  @IsString()
  filterValue?: string;

  @ApiProperty({ description: 'Field to order by', required: false })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiProperty({ description: 'Order type (ASC or DESC)', required: false })
  @IsOptional()
  @IsString()
  orderType?: 'ASC' | 'DESC';
}
