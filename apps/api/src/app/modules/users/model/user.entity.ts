
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync } from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {unique:true})
  username:string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @BeforeInsert()
  encryptPassword() {
    this.password = hashSync(this.password, 10);
  }

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
