import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionshipsController } from './championships.controller';
import { ChampionshipsService } from './championships.service';
import { Championship } from './model/championship.entity';
import { RoundsModule } from './modules/rounds/rounds.module';

@Module({
  imports: [TypeOrmModule.forFeature([Championship]), RoundsModule],
  controllers: [ChampionshipsController],
  providers: [ChampionshipsService],
  exports: [],
})
export class ChampionshipsModule {}
