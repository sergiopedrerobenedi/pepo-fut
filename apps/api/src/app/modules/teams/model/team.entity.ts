import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Player } from '../../players/model/player.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
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

  @OneToMany(() => Player, (players) => players.team, { eager: true, cascade: ['insert', 'update'] })
  players: Player[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
