import { ApiProperty } from '@nestjs/swagger';
import { PlayerPositionEnum } from '../enums/player-position.enum';

export class PlayerPositionDto {
  id?: number;
  @ApiProperty({
    required: true,
    type: PlayerPositionEnum,
    enum: PlayerPositionEnum,
    example: PlayerPositionEnum.RB,
  })
  positionAbbreviation: PlayerPositionEnum;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Goalkeeper',
  })
  description: string;

  constructor(positionAbbreviation: PlayerPositionEnum, description: string, id?: number) {
    this.id = id;
    this.positionAbbreviation = positionAbbreviation;
    this.description = description;
  }
}
