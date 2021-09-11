import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ICrudServices } from '../../../../common/classes/crud-services.interface';
import { Pagination } from '../../../../common/classes/pagination.class';
import { MatchsQueryParams } from './classes/matchs-query-params.class';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchResponseDto } from './dto/match-response.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './model/match.entity';

@Injectable()
export class MatchsService implements ICrudServices<Match, MatchResponseDto, CreateMatchDto, UpdateMatchDto> {
  constructor(@InjectRepository(Match) private readonly repository: Repository<Match>) {}

  getAll(queryParams: any): Promise<Pagination<MatchResponseDto>> {
    return this.fetchAll(queryParams).then(
      (paginationResult: Pagination<Match>) =>
        new Pagination<MatchResponseDto>(
          paginationResult.items.map((match) => this.fromEntityToDto(match)),
          paginationResult.count,
        ),
    );
  }
  getById(id: string): Promise<MatchResponseDto> {
    return this.fetchById(id).then((match: Match) => {
      if (match) {
        return this.fromEntityToDto(match);
      }
    });
  }
  create(createDto: CreateMatchDto): Promise<void> {
    return this.repository
      .save(this.repository.create(createDto))
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  async updateById(id: any, updateDto: UpdateMatchDto, repository?: Repository<Match>): Promise<void> {
    const dbMatch: Match = await this.fetchById(id);
    return repository
      .save({ ...dbMatch, ...updateDto })
      .catch((error) => {
        throw new Error(error);
      })
      .then(() => {
        return;
      });
  }
  patchById(id: any, createDto: CreateMatchDto): Promise<void> {
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
  fromEntityToDto(entity: Match): MatchResponseDto {
    return { ...entity };
  }

  private fetchAll(queryParams: MatchsQueryParams): Promise<Pagination<Match>> {
    const take = queryParams.limit || 10;
    const skip = queryParams.offset || 0;
    const { awayTeamName, localTeamName, roundNumber, fromDate, toDate } = queryParams;
    const query: SelectQueryBuilder<Match> = this.repository
      .createQueryBuilder('match')
      .where('1=1')
      .take(take)
      .skip(skip)
      .leftJoinAndSelect('match.localTeam', 'localTeam')
      .leftJoinAndSelect('match.awayTeam', 'awayTeam')
      .leftJoinAndSelect('match.round', 'round');

    if (fromDate) {
      query.andWhere('startDate <= :fromDate', { fromDate });
    }
    if (toDate) {
      query.andWhere('startDate >= :toDate', { toDate });
    }
    if (awayTeamName) {
      query.andWhere('awayTeam.name = :awayTeamName', { awayTeamName });
    }
    if (localTeamName) {
      query.andWhere('localTeam.name = :localTeamName', { localTeamName });
    }
    if (roundNumber) {
      query.andWhere('round.number = :roundNumber', { roundNumber });
    }

    return query.getManyAndCount().then(([items, count]) => {
      return new Pagination<Match>(items, count);
    });
  }

  private fetchById(id): Promise<Match> {
    return this.repository.findOne({ where: { id } }).catch((error) => {
      throw new Error(error);
    });
  }
}
