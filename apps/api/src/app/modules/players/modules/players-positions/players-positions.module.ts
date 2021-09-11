import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerPosition } from './model/player-position.entity';
import { PlayersPositionsService } from './players-positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerPosition])],
  controllers: [],
  providers: [PlayersPositionsService],
  exports: [PlayersPositionsService],
})
export class PlayersPositionsModule {
  constructor(private readonly playersPositionService: PlayersPositionsService) {
    this.playersPositionService.populate().then();
  }
}
