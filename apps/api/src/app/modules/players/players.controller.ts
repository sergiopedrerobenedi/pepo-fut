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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from '../../common/classes/pagination.class';
import { PlayerQueryParams } from './classes/player-query-params.class';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerResponseDto } from './dto/player-response.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { BestFootEnum } from './enums/best-foot.enum';
import { PlayerPositionEnum } from './modules/players-positions/enums/player-position.enum';
import { PlayersService } from './players.service';

@ApiTags('players')
@Controller(`players`)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch players',
    description: 'Fetch all players queried',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The championships requested have been recovered',
    type: PlayerResponseDto,
    isArray: true,
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
    description: "The player's name which is used to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'surname',
    description: "The player's surname which is used to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'birthday',
    description: "The player's birthday which is used to filter results",
    required: false,
    type: Date,
  })
  @ApiQuery({
    name: 'injured',
    description: "The player''s injured flag which is used to filter results",
    required: false,
    type: Boolean,
  })
  @ApiQuery({
    name: 'nationality',
    description: "The player's nationality which is used to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'heightCm',
    description: "The player''s height in cm, which is used to filter results",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'weightKg',
    description: "The player''s weight in kg, which is used to filter results",
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'bestFoot',
    description: "The player's best foot which is used to filter results",
    required: false,
    enum: BestFootEnum,
  })
  @ApiQuery({
    name: 'positions',
    description: "The player's positions which are used to filter results",
    required: false,
    enum: PlayerPositionEnum,
    isArray: true,
  })
  getAll(@Query() queryParams: PlayerQueryParams): Promise<Pagination<PlayerResponseDto>> {
    return this.playersService.getAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get player by id',
    description: 'Fetch player queried by its id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The player requested has been recovered',
    type: PlayerResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The player requested not exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to recover player',
  })
  async getById(@Param('id') id: string): Promise<PlayerResponseDto> {
    const result: PlayerResponseDto = await this.playersService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new player',
    description: 'Creates a new player entity into the database',
  })
  @ApiBody({
    type: CreatePlayerDto,
    description: 'Player data to insert',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The player was created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body fields are wrong',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to create player',
  })
  create(@Body() createPlayerDto: CreatePlayerDto): Promise<void> {
    return this.playersService.create(createPlayerDto).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update/Create a player',
    description: 'Updates an existing player or creates it if not exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The player was updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to update player',
  })
  updateById(@Param('id') id: string, @Body() newPlayerData: UpdatePlayerDto): Promise<void> {
    return this.playersService.updateById(id, newPlayerData).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates partially a player',
    description: 'Updates partially an existing player',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The player was patched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to patch player',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The player to patch was not found',
  })
  async patchById(@Param('id') id: string, @Body() newPlayerData: CreatePlayerDto): Promise<void> {
    const player: PlayerResponseDto = await this.playersService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!player) {
      throw new NotFoundException();
    }
    return this.playersService.patchById(id, newPlayerData).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Updates partially a championship',
    description: 'Updates partially an existing championship',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The championship was deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The championship to delete was not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to delete championship',
  })
  async deleteById(@Param('id') id: string) {
    const player: PlayerResponseDto = await this.playersService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!player) {
      throw new NotFoundException();
    }
    return this.playersService.deleteById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }
}
