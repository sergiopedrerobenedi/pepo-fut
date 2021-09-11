import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../../players/model/player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  country: string;

  @Column('varchar')
  logoFileName: string;

  @OneToMany(() => Player, (players) => players.team)
  players: Player;
}
