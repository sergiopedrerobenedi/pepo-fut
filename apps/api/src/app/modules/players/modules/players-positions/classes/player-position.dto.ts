import { PlayerPositionEnum } from '../enums/player-position.enum';

export class PlayerPositionDto {
  id?: number;
  positionAbbreviation: PlayerPositionEnum;
  description: string;

  constructor(positionAbbreviation: PlayerPositionEnum, description: string, id?: number) {
    this.id = id;
    this.positionAbbreviation = positionAbbreviation;
    this.description = description;
  }
}
