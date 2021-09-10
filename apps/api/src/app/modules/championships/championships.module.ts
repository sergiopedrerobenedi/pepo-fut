import { Module } from "@nestjs/common";
import { ChampionshipsController } from "./championships.controller";
import { ChampionshipsService } from "./championships.service";

@Module({
  imports:[],
  controllers:[ChampionshipsController],
  providers:[ChampionshipsService],
  exports:[]
})
export class ChampionshipsModule {}
