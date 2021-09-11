import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Round } from './model/round.entity';

@Injectable()
export class RoundsService {
  constructor(@InjectRepository(Round) private readonly repository: Repository<Round>) {}

  findByPks(id: string, number: number): Promise<Round> {
    return this.repository.findOne({ id, number });
  }
}
