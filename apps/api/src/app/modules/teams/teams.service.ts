import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, Transaction } from 'typeorm';
import { ICrudServices } from '../../common/classes/crud-services.interface';
import { Pagination } from '../../common/classes/pagination.class';
import { TeamsQueryParams } from './classes/teams-query-params.class';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamResponseDto } from './dto/team-response.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './model/team.entity';

@Injectable()
export class TeamsService implements ICrudServices<Team, TeamResponseDto, CreateTeamDto, UpdateTeamDto> {
  constructor(@InjectRepository(Team) private readonly repository: Repository<Team>) {}

  getAll(queryParams: TeamsQueryParams): Promise<Pagination<TeamResponseDto>> {
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
    return;
    // return this.repository
    //   .save(this.repository.create(createTeamDto))
    //   .then(() => {
    //     return;
    //   })
    //   .catch((error) => {
    //     throw new Error(error);
    //   });
  }

  @Transaction()
  async updateById(id: any, updateDto: UpdateTeamDto, repository?: Repository<Team>): Promise<void> {
    return;
    // const dbTeam: Team = await this.fetchById(id);
    // return repository
    //   .save({ ...dbTeam, ...updateDto })
    //   .catch((error) => {
    //     throw new Error(error);
    //   })
    //   .then(() => {
    //     return;
    //   });
  }
  patchById(id: any, createDto: CreateTeamDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  fromEntityToDto(entity: Team): TeamResponseDto {
    throw new Error('Method not implemented.');
  }

  private fetchAll(queryParams: TeamsQueryParams): Promise<Pagination<Team>> {
    const take = queryParams.limit || 10;
    const skip = queryParams.offset || 0;
    const { name, foundationDate, championshipName, nationality, president, stadium } = queryParams;
    const query: SelectQueryBuilder<Team> = this.repository
      .createQueryBuilder('team')
      .where('1=1')
      .take(take)
      .skip(skip)
      .leftJoinAndSelect('team.championship', 'championship')
      .leftJoinAndSelect('team.players', 'players');

    if (name) {
      query.andWhere('name = :name', { name });
    }
    if (foundationDate) {
      query.andWhere('foundationDate = :foundationDate', { foundationDate });
    }
    if (championshipName) {
      query.andWhere('championship.name = :championshipName', { championshipName });
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
