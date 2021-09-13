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
    host: 'ec2-3-233-100-43.compute-1.amazonaws.com',
    type: 'postgres',
    port: 5432,
    username: 'lnemlxbybwluwt',
    password: '1bdc731c823a281c0f004faff4d7652c2e690e2a6e64eb1e3fb9ce048fb5a9d6',
    database: 'da32nl1j2f1u0b',
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
