import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ICrudServices } from '../../common/classes/crud-services.interface';
import { Pagination } from '../../common/classes/pagination.class';
import { TeamsQueryParams } from './classes/teams-query-params.class';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamResponseDto } from './dto/team-response.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './model/team.entity';

@Injectable()
export class TeamsService
  implements ICrudServices<Team, TeamResponseDto, CreateTeamDto, UpdateTeamDto, TeamsQueryParams>
{
  constructor(@InjectRepository(Team) private readonly repository: Repository<Team>) {}

  getAll(queryParams?: TeamsQueryParams): Promise<Pagination<TeamResponseDto>> {
    return this.fetchAll(queryParams).then(
      (paginationResult: Pagination<Team>) =>
        new Pagination<TeamResponseDto>(
          paginationResult.items.map((team) => this.fromEntityToDto(team)),
          paginationResult.count,
        ),
    );
  }
  getById(id: string): Promise<TeamResponseDto> {
    return this.fetchById(id).then((team: Team) => {
      if (team) {
        return this.fromEntityToDto(team);
      }
    });
  }

  create(createTeamDto: CreateTeamDto): Promise<void> {
    const newTeam = this.repository.create(createTeamDto);
    return this.repository
      .save(newTeam)
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async updateById(id: any, updateDto: UpdateTeamDto): Promise<void> {
    const dbTeam: Team = await this.fetchById(id);
    return this.repository
      .save({ ...dbTeam, ...updateDto })
      .catch((error) => {
        throw new Error(error);
      })
      .then(() => {
        return;
      });
  }
  patchById(id: any, createDto: CreateTeamDto): Promise<void> {
    return this.repository
      .update(
        { id },
        {
          ...createDto,
        },
      )
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  deleteById(id: any): Promise<void> {
    return this.repository
      .delete(id)
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  fromEntityToDto(entity: Team): TeamResponseDto {
    return { ...entity };
  }

  private fetchAll(queryParams?: TeamsQueryParams): Promise<Pagination<Team>> {
    const take = queryParams?.limit || 10;
    const skip = queryParams?.offset || 0;
    const query: SelectQueryBuilder<Team> = this.repository
      .createQueryBuilder('team')
      .take(take)
      .skip(skip)
      .leftJoinAndSelect('team.players', 'players')
      .leftJoinAndSelect('players.positions', 'positions')
      .where('1=1');

    if (queryParams) {
      const { name, foundationDate, championshipName, nationality, president, stadium } = queryParams;
      if (name) {
        query.andWhere('name = :name', { name });
      }
      if (foundationDate) {
        query.andWhere('foundationDate = :foundationDate', { foundationDate });
      }
      if (nationality) {
        query.andWhere('nationality = :nationality', { nationality });
      }
      if (president) {
        query.andWhere('president = :president', { president });
      }

      if (stadium) {
        query.andWhere('stadium = :stadium', { stadium });
      }
    }

    return query.getManyAndCount().then(([items, count]) => {
      return new Pagination<Team>(items, count);
    });
  }

  private fetchById(id): Promise<Team> {
    return this.repository.findOne({ where: { id } }).catch((error) => {
      throw new Error(error);
    });
  }
}
