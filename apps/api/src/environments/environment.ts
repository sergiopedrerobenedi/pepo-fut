import { Championship } from '../app/modules/championships/model/championship.entity';
import { Match } from '../app/modules/championships/modules/matchs/model/match.entity';
import { Round } from '../app/modules/championships/modules/rounds/model/round.entity';
import { Player } from '../app/modules/players/model/player.entity';
import { PlayerPosition } from '../app/modules/players/modules/players-positions/model/player-position.entity';
import { Team } from '../app/modules/teams/model/team.entity';
import { User } from '../app/modules/users/model/user.entity';
import { EnvironmentDto } from './environment.dto';

export const environment: EnvironmentDto = {
  production: false,
  typeOrmConfig: {
    host: 'localhost',
    type: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'pepo_fut',
    synchronize: true,
    logging: false,
    entities: [User, Team, Championship, Round, Match, Player, PlayerPosition],
  },
};
