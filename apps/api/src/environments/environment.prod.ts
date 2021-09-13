import { Championship } from '../app/modules/championships/model/championship.entity';
import { Match } from '../app/modules/championships/modules/matchs/model/match.entity';
import { Round } from '../app/modules/championships/modules/rounds/model/round.entity';
import { Player } from '../app/modules/players/model/player.entity';
import { PlayerPosition } from '../app/modules/players/modules/players-positions/model/player-position.entity';
import { Team } from '../app/modules/teams/model/team.entity';
import { User } from '../app/modules/users/model/user.entity';
import { EnvironmentDto } from './environment.dto';

export const environment: EnvironmentDto = {
  production: true,
  typeOrmConfig: {
    host: 'ec2-52-203-74-38.compute-1.amazonaws.com',
    type: 'postgres',
    port: 5432,
    username: 'xcezbjvhmpniqh',
    password: '056b9ec4b87700c11a1e76a309e3848a220b1aa938992afa742e06f5bda61e92',
    database: 'dblr9jp4o7cghe',
    synchronize: false,
    logging: false,
    entities: [User, Team, Championship, Round, Match, Player, PlayerPosition],
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
