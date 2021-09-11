import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Team } from '../../teams/model/team.entity';
import { Round } from '../modules/rounds/model/round.entity';

@Entity()
export class Championship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { default: null })
  description?: string;

  @Column('varchar')
  country: string;

  @OneToMany(() => Round, (round) => round.championship, { cascade: true, eager: true })
  rounds: Round[];

  @OneToMany(() => Team, (teams) => teams.championship, { eager: true, cascade: true })
  teams: Team[];

  @Column('varchar')
  season: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
