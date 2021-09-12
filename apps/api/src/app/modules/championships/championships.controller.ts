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
import { ChampionshipsService } from './championships.service';
import { ChampionshipResponseDto } from './dto/championship-response.dto';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';

@ApiTags('championships')
@Controller(`championships`)
export class ChampionshipsController {
  constructor(private readonly championshipService: ChampionshipsService) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch championships',
    description: 'Fetch all championships queried',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The championships requested have been recovered',
    type: ChampionshipResponseDto,
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
    name: 'limit',
    description: 'The maximum number of entities to return',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    description: "The championship's name if you want to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'description',
    description: "The championship's description if you want to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'country',
    description: "The championship's country if you want to filter results",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'season',
    description: "The championship's season if you want to filter results",
    required: false,
    type: String,
  })
  getAll(@Query() queryParams): Promise<Pagination<ChampionshipResponseDto>> {
    return this.championshipService.getAll(queryParams);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get championship by id',
    description: 'Fetch championship queried by its id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The championship requested has been recovered',
    type: ChampionshipResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The championship requested not exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to recover championship',
  })
  async getById(@Param('id') id: string): Promise<ChampionshipResponseDto> {
    const result: ChampionshipResponseDto = await this.championshipService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new championship',
    description: 'Creates a new championship entity into the database',
  })
  @ApiBody({
    type: CreateChampionshipDto,
    description: 'Championship data to insert',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The championship was created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body fields are wrong',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to create championship',
  })
  create(@Body() createChampionshipDto: CreateChampionshipDto): Promise<void> {
    return this.championshipService.create(createChampionshipDto).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update/Create a championship',
    description: 'Updates an existing championship or creates it if not exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The championship was updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to update championship',
  })
  updateById(@Param('id') id: string, @Body() newChampionshipData: UpdateChampionshipDto): Promise<void> {
    return this.championshipService.updateById(id, newChampionshipData).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates partially a championship',
    description: 'Updates partially an existing championship',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The championship was patched successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'An error has occurred while trying to patch championship',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The championship to patch was not found',
  })
  async patchById(@Param('id') id: string, @Body() newChampionshipData: CreateChampionshipDto): Promise<void> {
    const championship: ChampionshipResponseDto = await this.championshipService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!championship) {
      throw new NotFoundException();
    }
    return this.championshipService.patchById(id, newChampionshipData).catch((error) => {
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
    const championship: ChampionshipResponseDto = await this.championshipService.getById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
    if (!championship) {
      throw new NotFoundException();
    }
    return this.championshipService.deleteById(id).catch((error) => {
      throw new InternalServerErrorException(error.toString());
    });
  }
}
