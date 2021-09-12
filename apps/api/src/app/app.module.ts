import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ChampionshipsModule } from './modules/championships/championships.module';
import { PlayersModule } from './modules/players/players.module';
import { TeamsModule } from './modules/teams/teams.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pepo_fut',
      synchronize: true,
      logging: false,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    }),
    UsersModule,
    ChampionshipsModule,
    PlayersModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
