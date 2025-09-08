import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpCode,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GetUser } from 'src/modules/auth/decorators/getUser.decorator';
import { User } from '../entities/user.entity';
import { CreateCompanyUserRequest } from './request/createCompanyUser.request';
import { CreateCompanyUserService } from '../services/createCompanyUser.service';
import { ListUsersRequest } from './request/listUsers.request';
import { ListUsersService } from '../services/listUsers.service';
import { GetUserService } from '../services/getUser.service';
import { parseQueryFilters } from 'src/shared/helpers/filters/parsers/parseQueryFilters';
import { instanceToPlain } from 'class-transformer';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly createCompanyUserService: CreateCompanyUserService,
    private readonly listUsersService: ListUsersService,
    private readonly getUserService: GetUserService,
  ) {}

  @Post('company-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: `Create a new user for the authenticated user's company` })
  @ApiBody({ type: CreateCompanyUserRequest })
  @ApiResponse({ status: HttpStatus.CREATED, description: `User created successfully` })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `Unauthorized` })
  public async createCompanyUser(
    @GetUser() user: User,
    @Body() createCompanyUserDto: CreateCompanyUserRequest,
  ) {
    return this.createCompanyUserService.execute(user.company_id, createCompanyUserDto);
  }

  @Get()
  @ApiOperation({ summary: `List all users for the authenticated user's company` })
  @ApiResponse({ status: HttpStatus.OK, description: `Users listed successfully` })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `Unauthorized` })
  public async findAll(
    @Query() query: ListUsersRequest,
    @GetUser() user: User,
  ) {
    const filterQuery = parseQueryFilters(query);
    const result = await this.listUsersService.execute(user.company_id, filterQuery);
    return instanceToPlain(result);
  }

  @Get(':id')
  @ApiOperation({ summary: `Get a user by ID for the authenticated user's company` })
  @ApiResponse({ status: HttpStatus.OK, description: `User found successfully` })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `User not found` })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `Unauthorized` })
  public async findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    const result = await this.getUserService.findOne(id, user.company_id);
    return instanceToPlain(result);
  }
}
