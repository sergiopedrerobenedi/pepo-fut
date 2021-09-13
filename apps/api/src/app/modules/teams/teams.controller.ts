import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from '../../common/classes/pagination.class';
import { TeamsQueryParams } from './classes/teams-query-params.class';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamResponseDto } from './dto/team-response.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

@ApiTags('teams')
@Controller('teams')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch teams',
    description: 'Fetch all teams queried',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The teams requested have been recovered',
    type: TeamResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to recover teams',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiQuery({
    name: 'limit',
    description: 'The maximum number of entities to return',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    description: 'The offset applied to the number of entities to return',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    description: "The teams's name which is used to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'president',
    description: "The teams's president which is used to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'nationality',
    description: "The teams's nationality which is used to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'stadium',
    description: "The teams''s stadium which is used to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'foundationDate',
    description: "The teams's foundation date which is used to filter results",
    required: false,
    type: Date,
  })
  @ApiQuery({
    name: 'championshipName',
    description: "The teams''s championship name which is used to filter results",
    required: false,
    type: String,
  })
  getAll(@Query() queryParams?: TeamsQueryParams): Promise<Pagination<TeamResponseDto>> {
    return this.teamsService.getAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get team by id',
    description: 'Fetch team queried by its id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The team requested has been recovered',
    type: TeamResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The team requested not exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to recover team ',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getById(@Param('id') id: string): Promise<TeamResponseDto> {
    const result: TeamResponseDto = await this.teamsService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new team',
    description: 'Creates a new team entity into the database',
  })
  @ApiBody({
    type: CreateTeamDto,
    description: 'Team data to insert',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The team was created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body fields are wrong',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to create team',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  create(@Body() createTeamDto: CreateTeamDto): Promise<void> {
    return this.teamsService.create(createTeamDto).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update/Create a team',
    description: 'Updates an existing team or creates it if not exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The team was updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to update team ',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  updateById(@Param('id') id: string, @Body() newTeamData: UpdateTeamDto): Promise<void> {
    return this.teamsService.updateById(id, newTeamData).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates partially a team',
    description: 'Updates partially an existing team',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The team was patched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to patch team',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The team to patch was not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async patchById(@Param('id') id: string, @Body() newPlayerData: CreateTeamDto): Promise<void> {
    const team: TeamResponseDto = await this.teamsService.getById(id);
    if (!team) {
      throw new NotFoundException();
    }
    return this.teamsService.patchById(id, newPlayerData).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a team',
    description: 'Deletes an existing team from database',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The team was deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The team to delete was not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to delete team',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async deleteById(@Param('id') id: string): Promise<void> {
    const team: TeamResponseDto = await this.teamsService.getById(id);
    if (!team) {
      throw new NotFoundException();
    }
    return this.teamsService.deleteById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }
}
