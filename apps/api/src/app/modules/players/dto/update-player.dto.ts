import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { BestFootEnum } from '../enums/best-foot.enum';
import { PlayerPositionDto } from '../modules/players-positions/classes/player-position.dto';
import { PLAYER_POSITIONS } from '../modules/players-positions/mocks/players-positions.mocks';

export class UpdatePlayerDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Ronaldo',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Nazario',
  })
  @IsString()
  surname: string;

  @ApiProperty({
    type: Date,
    required: true,
    example: '1992-08-27',
  })
  @IsDateString()
  birthday: Date;

  @ApiProperty({
    type: Boolean,
    required: true,
    example: false,
  })
  @IsBoolean()
  injured: boolean;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Brazil',
  })
  @IsString()
  nationality: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 179,
  })
  @IsInt()
  heightCm: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 80,
  })
  @IsNumber()
  weightKg: number;

  @ApiProperty({
    type: String,
    required: true,
    example: BestFootEnum.RIGHT,
  })
  @IsEnum(BestFootEnum)
  bestFoot: BestFootEnum;

  @ApiProperty({
    type: PlayerPositionDto,
    isArray: true,
    required: true,
    example: [PLAYER_POSITIONS[8], PLAYER_POSITIONS[7]],
  })
  positions: PlayerPositionDto[];

  // @ApiProperty({
  //   type: TeamResponseDto,
  //   required: true,
  //   example: 'right',
  // })
  // team: Team;
}
