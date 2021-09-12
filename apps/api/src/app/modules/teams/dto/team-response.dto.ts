import { ApiProperty } from '@nestjs/swagger';
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
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Christian Lapetra',
  })
  president: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Spain',
  })
  nationality: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'La Romareda',
  })
  stadium: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'images/teams/realZaragoza.jpg',
  })
  logoPath: string;

  @ApiProperty({
    type: PlayerResponseDto,
    required: true,
    isArray: true,
  })
  players: PlayerResponseDto[];
}
