import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Championship } from '../../../model/championship.entity';
import { Match } from '../../matchs/model/match.entity';

@Entity()
export class Round {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column('varchar', { default: null })
  comment?: string;

  @ManyToOne(() => Championship, (championship) => championship.rounds, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: true,
    orphanedRowAction: 'delete',
  })
  championship: Championship;

  @OneToMany((type) => Match, (match) => match.round)
  matchs: Match;

  constructor(id: string, number: number, comment?: string) {
    this.id = id;
    this.number = number;
    this.comment = comment;
  }
}
