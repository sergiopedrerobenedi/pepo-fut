import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Championship } from '../../championships/model/championship.entity';
import { Player } from '../../players/model/player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  president: string;

  @Column('varchar')
  nationality: string;

  @Column('varchar')
  stadium: string;

  @Column('varchar')
  logoPath: string;

  @Column('date')
  foundationDate: Date;

  @OneToMany(() => Player, (players) => players.team)
  players: Player;

  @ManyToOne(() => Championship, (championship) => championship)
  championship: Championship;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
