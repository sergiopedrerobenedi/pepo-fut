import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column('varchar')
  season: string;
}
