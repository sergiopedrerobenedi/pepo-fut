import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { Championship } from './modules/championships/model/championship.entity';
import { Match } from './modules/championships/modules/matchs/model/match.entity';
import { Round } from './modules/championships/modules/rounds/model/round.entity';
import { Team } from './modules/teams/model/team.entity';
import { User } from './modules/users/model/user.entity';
import { UsersModule } from './modules/users/users.module';



@Module({
  imports: [AuthModule,TypeOrmModule.forRoot({
     type:'postgres',
     port: 5432,
     username: 'postgres',
     password: 'postgres',
     database: 'pepo_fut',
     schema:'public',
     synchronize:true,
     logging:false,
     entities: [User,Championship,Match, Round,Team]
  }),UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
