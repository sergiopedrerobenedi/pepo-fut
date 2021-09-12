import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, Transaction, TransactionRepository } from 'typeorm';
import { ICrudServices } from '../../common/classes/crud-services.interface';
import { Pagination } from '../../common/classes/pagination.class';
import { ChampionshipQueryParams } from './classes/championships-query-params.class';
import { ChampionshipResponseDto } from './dto/championship-response.dto';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship.dto';
import { Championship } from './model/championship.entity';

@Injectable()
export class ChampionshipsService
  implements
    ICrudServices<
      Championship,
      ChampionshipResponseDto,
      CreateChampionshipDto,
      UpdateChampionshipDto,
      ChampionshipQueryParams
    >
{
  constructor(@InjectRepository(Championship) private readonly repository: Repository<Championship>) {}

  getAll(queryParams?: ChampionshipQueryParams): Promise<Pagination<ChampionshipResponseDto>> {
    return this.fetchAll(queryParams).then(
      (paginationResult: Pagination<Championship>) =>
        new Pagination<ChampionshipResponseDto>(
          paginationResult.items.map((championship) => this.fromEntityToDto(championship)),
          paginationResult.count,
        ),
    );
  }

  getById(id: string): Promise<ChampionshipResponseDto> {
    return this.fetchById(id).then((championship: Championship) => {
      if (championship) {
        return this.fromEntityToDto(championship);
      }
    });
  }

  create(createChampionshipDto: CreateChampionshipDto): Promise<void> {
    return this.repository
      .save(this.repository.create(createChampionshipDto))
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  @Transaction()
  async updateById(
    id: string,
    newChampionshipData: UpdateChampionshipDto,
    @TransactionRepository(Championship) repository?: Repository<Championship>,
  ): Promise<void> {
    const dbChampionship: Championship = await this.fetchById(id);
    return repository
      .save({ ...dbChampionship, ...newChampionshipData })
      .catch((error) => {
        throw new Error(error);
      })
      .then(() => {
        return;
      });
  }

  patchById(id: string, newChampionshipData: CreateChampionshipDto) {
    return this.repository
      .update(
        { id },
        {
          country: newChampionshipData.country,
          description: newChampionshipData.description,
          name: newChampionshipData.name,
          season: newChampionshipData.season,
        },
      )
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  deleteById(id): Promise<void> {
    return this.repository
      .delete(id)
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  fromEntityToDto(championship: Championship): ChampionshipResponseDto {
    return {
      ...championship,
    };
  }

  private fetchAll(queryParams?: ChampionshipQueryParams): Promise<Pagination<Championship>> {
    const take = queryParams?.limit || 10;
    const skip = queryParams?.offset || 0;
    const query: SelectQueryBuilder<Championship> = this.repository
      .createQueryBuilder('championship')
      .where('1=1')
      .take(take)
      .skip(skip)
      .leftJoinAndSelect('championship.rounds', 'rounds')
      .leftJoinAndSelect('rounds.matchs', 'matchs')
      .leftJoinAndSelect('matchs.localTeam', 'localTeam')
      .leftJoinAndSelect('matchs.awayTeam', 'awayTeam');
    if (queryParams) {
      const { name, description, country, season } = queryParams;
      if (name) {
        query.andWhere('name = :name', { name });
      }
      if (description) {
        query.andWhere('description = :description', { description });
      }
      if (country) {
        query.andWhere('country = :country', { country });
      }
      if (season) {
        query.andWhere('season = :season', { season });
      }
    }

    return query.getManyAndCount().then(([items, count]) => {
      return new Pagination(items, count);
    });
  }

  private fetchById(id): Promise<Championship> {
    return this.repository.findOne({ where: { id } }).catch((error) => {
      throw new Error(error);
    });
  }
}
