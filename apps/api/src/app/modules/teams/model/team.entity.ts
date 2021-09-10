import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "../../championships/modules/matchs/model/match.entity";

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column('varchar')
  country:string;

  @Column('varchar')
  logoFileName:string;




}
