import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { UpdateRoundDto } from '../modules/rounds/dto/update-round.dto';

export class UpdateChampionshipDto {
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

  @ApiProperty({ type: UpdateRoundDto, isArray: true })
  @IsArray()
  @Type(() => UpdateRoundDto)
  readonly rounds: UpdateRoundDto[];

  @ApiProperty({
    required: true,
    type: String,
    description: "The championship's country",
    example: 'Spain',
  })
  @IsString()
  readonly season: string;
}
