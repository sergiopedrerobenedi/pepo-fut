import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateRoundDto } from '../modules/rounds/dto/create-round.dto';

export class CreateChampionshipDto {
  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's name",
    example: 'Premier League',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    required: false,
    type: String,
    description: "The championship's description",
    example: 'The main english league',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's country",
    example: 'England',
  })
  @IsString()
  readonly country: string;

  @ApiProperty({ type: CreateRoundDto, isArray: true, required: false })
  @IsArray()
  @Type(() => CreateRoundDto)
  @IsOptional()
  readonly rounds?: CreateRoundDto[];

  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's country",
    example: 'Spain',
  })
  @IsString()
  readonly season: string;
}
