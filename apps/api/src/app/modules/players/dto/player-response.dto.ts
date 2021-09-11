import { ApiProperty } from '@nestjs/swagger';
import { BestFootEnum } from '../enums/best-foot.enum';
import { PlayerPositionDto } from '../modules/players-positions/classes/player-position.dto';
import { PLAYER_POSITIONS } from '../modules/players-positions/mocks/players-positions.mocks';

export class PlayerResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'cc8cecf8-56af-4bd2-82d1-1ec01a3fc225',
  })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Ronaldo',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'Nazario',
  })
  surname: string;

  @ApiProperty({
    type: Date,
    required: true,
    example: '1992-08-27',
  })
  birthday: Date;

  @ApiProperty({
    type: Boolean,
    required: true,
    example: false,
  })
  injured: boolean;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Brazil',
  })
  nationality: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 179,
  })
  heightCm: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 80,
  })
  weightKg: number;

  @ApiProperty({
    enum: BestFootEnum,
    required: true,
    example: BestFootEnum.RIGHT,
  })
  bestFoot: BestFootEnum;

  @ApiProperty({
    type: PlayerPositionDto,
    isArray: true,
    example: [PLAYER_POSITIONS[0], PLAYER_POSITIONS[1]],
  })
  positions: PlayerPositionDto[];

  @ApiProperty({
    type: Date,
    required: false,
    example: new Date().toISOString(),
  })
  createdAt?: Date;

  @ApiProperty({
    type: Date,
    required: false,
    example: new Date().toISOString(),
  })
  updatedAt?: Date;

  // @ApiProperty({
  //   type: TeamResponseDto,
  //   required: true,
  //   example: 'right',
  // })
  // team: Team;
}
