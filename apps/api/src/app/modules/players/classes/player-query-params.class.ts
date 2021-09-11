import { BestFootEnum } from '../enums/best-foot.enum';
import { PlayerPositionEnum } from '../modules/players-positions/enums/player-position.enum';

export class PlayerQueryParams {
  name: string;
  surname: string;
  birthday: Date;
  injured: boolean;
  nationality: string;
  heightCm: number;
  weightKg: number;
  bestFoot: BestFootEnum;
  positions: PlayerPositionEnum[];
  limit: number;
  offset: number;
}
