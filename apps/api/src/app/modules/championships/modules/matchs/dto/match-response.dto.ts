import { ApiProperty } from '@nestjs/swagger';
import { TeamResponseDto } from '../../../../teams/dto/team-response.dto';
import { RoundResponseDto } from '../../rounds/dto/round-response.dto';

export class MatchResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'cc8cecf8-56af-4bd2-82d1-1ec01a3fc225',
  })
  id: string;

  @ApiProperty({
    type: RoundResponseDto,
    required: true,
    example: new RoundResponseDto(),
  })
  round: RoundResponseDto;

  @ApiProperty({
    type: Date,
    required: true,
    example: new Date(),
  })
  startDate: Date;

  @ApiProperty({
    type: TeamResponseDto,
    required: true,
    example: new TeamResponseDto(),
  })
  localTeam: TeamResponseDto;

  @ApiProperty({
    type: TeamResponseDto,
    required: true,
    example: new TeamResponseDto(),
  })
  awayTeam: TeamResponseDto;
}
