import { PlayerPositionDto } from '../classes/player-position.dto';
import { PlayerPositionEnum } from '../enums/player-position.enum';

export const PLAYER_POSITIONS: PlayerPositionDto[] = [
  {
    id: 1,
    positionAbbreviation: PlayerPositionEnum.GK,
    description: 'Goalkeeper',
  },
  {
    id: 2,
    positionAbbreviation: PlayerPositionEnum.CB,
    description: 'Center Back',
  },
  {
    id: 3,
    positionAbbreviation: PlayerPositionEnum.CM,
    description: 'Center Midfielder',
  },
  {
    id: 4,
    positionAbbreviation: PlayerPositionEnum.CAM,
    description: 'Center Attacking Midfielder',
  },
  {
    id: 5,
    positionAbbreviation: PlayerPositionEnum.LWB,
    description: 'Left Wing Back',
  },
  {
    id: 6,
    positionAbbreviation: PlayerPositionEnum.LB,
    description: 'Left Back',
  },
  {
    id: 7,
    positionAbbreviation: PlayerPositionEnum.RWB,
    description: 'Right Wing Back',
  },
  {
    id: 8,
    positionAbbreviation: PlayerPositionEnum.RB,
    description: 'Right Back',
  },
  {
    id: 9,
    positionAbbreviation: PlayerPositionEnum.ST,
    description: 'Striker',
  },
  {
    id: 10,
    positionAbbreviation: PlayerPositionEnum.LW,
    description: 'Left Wing',
  },
  {
    id: 11,
    positionAbbreviation: PlayerPositionEnum.RW,
    description: 'Right Wing',
  },
];
