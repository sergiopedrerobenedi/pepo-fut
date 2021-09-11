import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { PlayerResponseDto } from '../../players/dto/player-response.dto';

export class TeamResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'cc8cecf8-56af-4bd2-82d1-1ec01a3fc225',
  })
  id: string;

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
    type: PlayerResponseDto,
    required: true,
    isArray: true,
  })
  @Type(() => PlayerResponseDto)
  @ValidateNested({ each: true })
  players: PlayerResponseDto[];
}
