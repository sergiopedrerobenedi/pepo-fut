import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { User } from "./model/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  findById(id:string): Promise<User> {
    return this.repository.findOne({where:{id}});
  }

  findByUsername(username:string): Promise<User> {
    return this.repository.findOne({where:{username}});
  }

  create(signUpDto:SignUpDto): Promise<User> {
    return this.repository.save(this.repository.create(signUpDto));
  }

}
