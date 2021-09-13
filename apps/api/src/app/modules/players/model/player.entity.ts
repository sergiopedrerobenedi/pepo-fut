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
import { BestFootEnum } from '../enums/best-foot.enum';
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

  @Column('enum', { enum: BestFootEnum })
  bestFoot: BestFootEnum;

  @ManyToMany(() => PlayerPosition, { eager: true })
  @JoinTable()
  positions: PlayerPosition[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * If team is deleted, then players associated not have team assigned
   */
  @ManyToOne(() => Team, (team) => team.players, { onDelete: 'SET NULL' })
  team: Team;
}
