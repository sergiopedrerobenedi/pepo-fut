import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchsController } from './matchs.controller';
import { MatchsService } from './matchs.service';
import { Match } from './model/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchsService],
  controllers: [MatchsController],
  exports: [MatchsService],
})
export class MatchsModule {}
