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
import { CreateProjectService } from '../services/createProject.service';
import { ListProjectService } from '../services/listProject.service';
import { GetProjectService } from '../services/getProject.service';
import { UpdateProjectService } from '../services/updateProject.service';
import { DeleteProjectService } from '../services/deleteProject.service';
import { CreateProjectRequest } from './request/createProject.request';
import { UpdateProjectRequest } from './request/updateProject.request';
import { ListProjectRequest } from './request/listProject.request';
import { instanceToPlain } from 'class-transformer';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(
    private readonly createService: CreateProjectService,
    private readonly listService: ListProjectService,
    private readonly getService: GetProjectService,
    private readonly updateService: UpdateProjectService,
    private readonly deleteService: DeleteProjectService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  public async create(
    @Body() createDto: CreateProjectRequest,
    @GetUser() user: User,
  ) {
    return this.createService.create(user.company_id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  public async findAll(
    @Query() query: ListProjectRequest,
    @GetUser() user: User,
  ) {
    const result = await this.listService.execute(
      parseQueryFilters(query),
      user.company_id,
    );
    return instanceToPlain(result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  public async findOne(@Param('id') id: string) {
    const result = await this.getService.findOne(id);
    return instanceToPlain(result);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  public async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateProjectRequest,
  ) {
    return this.updateService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a project' })
  public async remove(@Param('id') id: string) {
    return this.deleteService.delete(id);
  }
}
