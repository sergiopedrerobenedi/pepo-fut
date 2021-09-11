import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ChampionshipsModule } from './modules/championships/championships.module';
import { Championship } from './modules/championships/model/championship.entity';
import { Match } from './modules/championships/modules/matchs/model/match.entity';
import { Round } from './modules/championships/modules/rounds/model/round.entity';
import { Team } from './modules/teams/model/team.entity';
import { User } from './modules/users/model/user.entity';
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
      logging: true,
      entities: [User, Championship, Match, Round, Team],
    }),
    UsersModule,
    ChampionshipsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
