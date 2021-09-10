import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Round } from "../modules/rounds/model/round.entity";

@Entity()
export class Championship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {unique:true})
  name:string;

  @Column('varchar', {default:null})
  description?: string;

  @Column('varchar')
  country: string;

  @OneToMany(type => Round, round=> round.championship )
  rounds:Round[];

  @Column('varchar')
  season:string;

}
