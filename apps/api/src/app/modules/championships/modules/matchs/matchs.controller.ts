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
import { Pagination } from '../../../../common/classes/pagination.class';
import { TeamResponseDto } from '../../../teams/dto/team-response.dto';
import { MatchsQueryParams } from './classes/matchs-query-params.class';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchResponseDto } from './dto/match-response.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchsService } from './matchs.service';

@ApiTags('matchs')
@Controller('matchs')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch matchs',
    description: 'Fetch all matchs queried',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The matchs requested have been recovered',
    type: MatchResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to recover matchs',
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
    name: 'roundNumber',
    description: "The matchs's round number which is used to filter results",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'fromDate',
    description: "The matchs's start date which is used with from date to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'toDate',
    description: "The matchs's start date which is used with to date to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'localTeamName',
    description: "The match''s local team name which is used to filter results",
    required: false,
    type: TeamResponseDto,
  })
  @ApiQuery({
    name: 'awayTeamName',
    description: "The matchs's away team name which is used to filter results",
    required: false,
    type: TeamResponseDto,
  })
  getAll(@Query() queryParams: MatchsQueryParams): Promise<Pagination<MatchResponseDto>> {
    return this.matchsService.getAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get match by id',
    description: 'Fetch match queried by its id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The match requested has been recovered',
    type: MatchResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The match requested not exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to recover match',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getById(@Param('id') id: string): Promise<MatchResponseDto> {
    const result: MatchResponseDto = await this.matchsService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new match',
    description: 'Creates a new match entity into the database',
  })
  @ApiBody({
    type: CreateMatchDto,
    description: 'Match data to insert',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The match was created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body fields are wrong',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to create match',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  create(@Body() createMatchDto: CreateMatchDto): Promise<void> {
    return this.matchsService.create(createMatchDto).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update/Create a match',
    description: 'Updates an existing match or creates it if not exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The match was updated or created successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to update/create match',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  updateById(@Param('id') id: string, @Body() newMatchData: UpdateMatchDto): Promise<void> {
    return this.matchsService.updateById(id, newMatchData).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates partially a match',
    description: 'Updates partially an existing match',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The match was patched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to patch match',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The match to patch was not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async patchById(@Param('id') id: string, @Body() newMatchData: CreateMatchDto): Promise<void> {
    const player: MatchResponseDto = await this.matchsService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!player) {
      throw new NotFoundException();
    }
    return this.matchsService.patchById(id, newMatchData).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a match',
    description: 'Deletes an existing match',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The match was deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The match to delete was not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to delete match',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async deleteById(@Param('id') id: string) {
    const match: MatchResponseDto = await this.matchsService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!match) {
      throw new NotFoundException();
    }
    return this.matchsService.deleteById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }
}
