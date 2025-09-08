import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsPositive, IsIn, ValidateIf, IsNotEmpty } from 'class-validator';
import { IsEqualLength } from 'src/shared/validators/is-equal-length.validator';

const filterTypes = ['eq', 'not', 'not_in', 'in', 'like', 'ge', 'le', 'btw', 'is_null'];
const orderTypes = ['ASC', 'DESC'];

export class ListProjectRequest {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @Type(() => Number) @IsPositive() @IsNumber() @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Number of items per page', example: 10 })
  @Type(() => Number) @IsPositive() @IsNumber() @IsOptional()
  per_page?: number;

  @ApiPropertyOptional({ description: 'Filter by field' })
  @ValidateIf((o) => !!(o.filterType || o.filterValue))
  @IsNotEmpty() @IsString() @IsOptional()
  filterBy?: string;

  @ApiPropertyOptional({ description: 'Filter type', enum: filterTypes })
  @ValidateIf((o) => !!(o.filterBy || o.filterValue))
  @IsNotEmpty() @IsString() @IsOptional() @IsIn(filterTypes)
  @IsEqualLength('filterBy')
  filterType?: string;

  @ApiPropertyOptional({ description: 'Filter value' })
  @ValidateIf((o) => !!(o.filterBy || o.filterType))
  @IsNotEmpty() @IsString() @IsOptional()
  @IsEqualLength('filterBy')
  filterValue?: string;

  @ApiPropertyOptional({ description: 'Order by field' })
  @ValidateIf((o) => !!o.orderType)
  @IsNotEmpty() @IsString() @IsOptional()
  orderBy?: string;

  @ApiPropertyOptional({ description: 'Order type', enum: orderTypes })
  @IsIn(orderTypes) @IsString() @IsOptional()
  orderType?: 'ASC' | 'DESC';
}
