import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { ChampionshipResponseDto } from '../../championships/dto/championship-response.dto';
import { PlayerResponseDto } from '../../players/dto/player-response.dto';
import { Player } from '../../players/model/player.entity';

export class CreateTeamDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Real Zaragoza',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Christian Lapetra',
  })
  @IsString()
  president: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Spain',
  })
  @IsString()
  nationality: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'La Romareda',
  })
  @IsString()
  stadium: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'images/teams/realZaragoza.jpg',
  })
  @IsString()
  logoPath: string;

  @ApiProperty({
    type: Date,
    required: true,
    example: '1932-06-12',
  })
  foundationDate: Date;

  @ApiProperty({
    type: PlayerResponseDto,
    required: true,
    isArray: true,
  })
  @Type(() => Player)
  @ValidateNested({ each: true })
  players: PlayerResponseDto[];

  @ApiProperty({
    type: ChampionshipResponseDto,
    required: true,
    example: new ChampionshipResponseDto(),
  })
  @Type(() => ChampionshipResponseDto)
  @ValidateNested()
  championship: ChampionshipResponseDto;
}
