import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PLAYER_POSITIONS } from './mocks/players-positions.mocks';
import { PlayerPosition } from './model/player-position.entity';

@Injectable()
export class PlayersPositionsService {
  constructor(@InjectRepository(PlayerPosition) private readonly repository: Repository<PlayerPosition>) {}

  populate(): Promise<void> {
    return this.repository
      .save(PLAYER_POSITIONS)
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
