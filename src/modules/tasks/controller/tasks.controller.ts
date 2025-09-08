import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { GetUser } from 'src/modules/auth/decorators/getUser.decorator';
import { User } from 'src/modules/users/entities/user.entity';
import { parseQueryFilters } from 'src/shared/helpers/filters/parsers/parseQueryFilters';
import { CreateTaskService } from '../services/createTask.service';
import { ListTaskService } from '../services/listTask.service';
import { GetTaskService } from '../services/getTask.service';
import { UpdateTaskService } from '../services/updateTask.service';
import { DeleteTaskService } from '../services/deleteTask.service';
import { CreateTaskRequest } from './request/createTask.request';
import { UpdateTaskRequest } from './request/updateTask.request';
import { ListTaskRequest } from './request/listTask.request';

@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createService: CreateTaskService,
    private readonly listService: ListTaskService,
    private readonly getService: GetTaskService,
    private readonly updateService: UpdateTaskService,
    private readonly deleteService: DeleteTaskService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(@Body() createDto: CreateTaskRequest) {
    return this.createService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  findAll(@Query() query: ListTaskRequest, @GetUser() user: User) {
    return this.listService.execute(parseQueryFilters(query), user.company_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  findOne(@Param('id') id: string) {
    return this.getService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(@Param('id') id: string, @Body() updateDto: UpdateTaskRequest) {
    return this.updateService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  remove(@Param('id') id: string) {
    return this.deleteService.delete(id);
  }
}
