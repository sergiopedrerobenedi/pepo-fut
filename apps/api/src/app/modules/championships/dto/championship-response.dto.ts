import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RoundResponseDto } from '../modules/rounds/dto/round-response.dto';

export class ChampionshipResponseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's id",
    example: 'Premier League',
  })
  readonly id: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's name",
    example: 'Premier League',
  })
  readonly name: string;

  @ApiProperty({
    required: false,
    type: String,
    description: "The championship's description",
    example: 'The main english league',
  })
  readonly description?: string;

  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's country",
    example: 'England',
  })
  readonly country: string;

  @ApiProperty({ type: RoundResponseDto, isArray: true })
  @Type(() => RoundResponseDto)
  readonly rounds: RoundResponseDto[];

  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's country",
    example: 'Spain',
  })
  readonly season: string;
}
