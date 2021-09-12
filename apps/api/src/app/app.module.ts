import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { ChampionshipsModule } from './modules/championships/championships.module';
import { PlayersModule } from './modules/players/players.module';
import { TeamsModule } from './modules/teams/teams.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(environment.typeOrmConfig),
    UsersModule,
    ChampionshipsModule,
    PlayersModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
