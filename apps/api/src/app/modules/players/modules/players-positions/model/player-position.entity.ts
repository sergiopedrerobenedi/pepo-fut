import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PlayerPositionEnum } from '../enums/player-position.enum';

@Entity()
export class PlayerPosition {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('enum', { enum: PlayerPositionEnum })
  positionAbbreviation: PlayerPositionEnum;

  @Column('varchar')
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
