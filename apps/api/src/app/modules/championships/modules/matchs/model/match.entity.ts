import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Team } from '../../../../teams/model/team.entity';
import { Round } from '../../rounds/model/round.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Round, (round) => round.matchs)
  round: Round;

  @Column('date')
  startDate: Date;

  @ManyToOne(() => Team, (team) => team)
  localTeam: Team;

  @ManyToOne(() => Team, (team) => team)
  awayTeam: Team;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
