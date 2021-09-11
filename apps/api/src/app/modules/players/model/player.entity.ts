import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from '../../teams/model/team.entity';
import { PlayerPosition } from '../modules/players-positions/model/player-position.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @Column('date')
  birthday: Date;

  @Column('bool', { default: false })
  injured: boolean;

  @Column('varchar')
  nationality: string;

  @Column('int4')
  heightCm: number;

  @Column('int4')
  weightKg: number;

  @Column('varchar')
  bestFoot: string;

  @ManyToMany(() => PlayerPosition)
  @JoinTable()
  positions: PlayerPosition[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Team, (team) => team.players)
  team: Team;
}
