import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Championship } from "../../../model/championship.entity";
import { Match } from "../../matchs/model/match.entity";

@Entity()
export class Round {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  number:number;

  @Column('varchar', {default:null})
  comment?: string;

  @ManyToOne(type => Championship, championship => championship.rounds)
  championship:Championship;

  @OneToMany(type => Match, match => match.round)
  matchs:Match;

}
