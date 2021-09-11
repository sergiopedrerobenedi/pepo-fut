import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, Transaction, TransactionRepository } from 'typeorm';
import { ICrudServices } from '../../common/classes/crud-services.interface';
import { Pagination } from '../../common/classes/pagination.class';
import { PlayerQueryParams } from './classes/player-query-params.class';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerResponseDto } from './dto/player-response.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './model/player.entity';

@Injectable()
export class PlayersService implements ICrudServices<Player, PlayerResponseDto, CreatePlayerDto, UpdatePlayerDto> {
  constructor(@InjectRepository(Player) private readonly repository: Repository<Player>) {}

  getAll(queryParams: PlayerQueryParams): Promise<Pagination<PlayerResponseDto>> {
    return this.fetchAll(queryParams).then(
      (paginationResult: Pagination<Player>) =>
        new Pagination<PlayerResponseDto>(
          paginationResult.items.map((player) => this.fromEntityToDto(player)),
          paginationResult.count,
        ),
    );
  }

  getById(id: string): Promise<PlayerResponseDto> {
    return this.fetchById(id).then((player: Player) => {
      if (player) {
        return this.fromEntityToDto(player);
      }
    });
  }

  create(createPlayerDto: CreatePlayerDto): Promise<void> {
    return this.repository
      .save(this.repository.create(createPlayerDto))
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
    newPlayerData: UpdatePlayerDto,
    @TransactionRepository(Player) repository?: Repository<Player>,
  ): Promise<void> {
    const dbPlayer: Player = await this.fetchById(id);
    return repository
      .save({ ...dbPlayer, ...newPlayerData })
      .catch((error) => {
        throw new Error(error);
      })
      .then(() => {
        return;
      });
  }

  patchById(id: string, newPlayerData: CreatePlayerDto): Promise<void> {
    return this.repository
      .update(
        { id },
        {
          ...newPlayerData,
          positions: newPlayerData.positions,
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

  fromEntityToDto(entity: Player): PlayerResponseDto {
    return { ...entity };
  }

  private fetchAll(queryParams: PlayerQueryParams): Promise<Pagination<Player>> {
    const take = queryParams.limit || 10;
    const skip = queryParams.offset || 0;
    const { name, surname, birthday, bestFoot, heightCm, injured, nationality, positions, weightKg } = queryParams;
    const query: SelectQueryBuilder<Player> = this.repository
      .createQueryBuilder('player')
      .where('1=1')
      .take(take)
      .skip(skip)
      .leftJoinAndSelect('player.positions', 'positions');

    if (name) {
      query.andWhere('name = :name', { name });
    }
    if (surname) {
      query.andWhere('surname = :surname', { surname });
    }
    if (birthday) {
      query.andWhere('birthday = :birthday', { birthday });
    }
    if (bestFoot) {
      query.andWhere('bestFoot = :bestFoot', { bestFoot });
    }
    if (heightCm) {
      query.andWhere('bestFoot = :bestFoot', { bestFoot });
    }
    if (injured !== null && Boolean(injured)) {
      query.andWhere('bestFoot = :bestFoot', { bestFoot });
    }
    if (nationality) {
      query.andWhere('nationality = :nationality', { nationality });
    }
    if (positions) {
      const positionsWhereClause = positions.map((position) => `'${position}'`).join(',');
      query.andWhere(`positions.positionAbbreviation IN (${positionsWhereClause})`);
    }

    if (weightKg) {
      query.andWhere('weightKg = :weightKg', { weightKg });
    }

    return query.getManyAndCount().then(([items, count]) => {
      return new Pagination<Player>(items, count);
    });
  }

  private fetchById(id): Promise<Player> {
    return this.repository.findOne({ where: { id } }).catch((error) => {
      throw new Error(error);
    });
  }
}
