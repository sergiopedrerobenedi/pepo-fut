import { Injectable } from "@nestjs/common";
import { User } from "../users/model/user.entity";
import { UsersService } from "../users/users.service";
import { AuthDto } from "./dto/auth.dto";
import { compare } from "bcryptjs";
import { Token } from "./dto/interfaces/token.interface";
import { JwtPayload } from "./dto/interfaces/jwt-payload.interface";
import * as jwt from 'jsonwebtoken';
import { TOKEN_EXPIRE_TIME, TOKEN_SECRET } from "./auth.constants";
import { SignUpDto } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async authenticate(authDto: AuthDto): Promise<boolean> {
    const user: User = await this.usersService.findByUsername(authDto.username);
    return !user ? false : compare(authDto.password, user.password);
  }

  async createToken(username: string): Promise<Token> {
    const user: User = await this.usersService.findByUsername(username);
    if (!user) {
      return Promise.reject();
    }
    const jwtPayload: JwtPayload = new JwtPayload(user.id, user.username);
    const token: string = jwt.sign(
      JSON.parse(JSON.stringify(jwtPayload)),
      TOKEN_SECRET,
      {
        expiresIn: TOKEN_EXPIRE_TIME,
      },
    );
    return new Token(token, TOKEN_EXPIRE_TIME);
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    const { username } = payload;
    const user: User = await this.usersService.findByUsername(username);
    return user !== undefined;
  }

  signUp(signUpDto:SignUpDto): Promise<void> {
    return this.usersService.create(signUpDto).then(() => {return ;});
  }
}
