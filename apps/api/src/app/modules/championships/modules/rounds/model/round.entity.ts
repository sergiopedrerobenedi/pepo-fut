import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(id: string, number: number, comment?: string) {
    this.id = id;
    this.number = number;
    this.comment = comment;
  }
}
