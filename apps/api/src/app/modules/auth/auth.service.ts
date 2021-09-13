import { ConflictException, Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/model/user.entity';
import { UsersService } from '../users/users.service';
import { REFRESH_TOKEN_EXPIRE_TIME, REFRESH_TOKEN_SECRET, TOKEN_EXPIRE_TIME, TOKEN_SECRET } from './auth.constants';
import { JwtPayload } from './classes/jwt-payload.class';
import { AuthDto } from './dto/auth.dto';
import { Token } from './dto/interfaces/token.interface';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async authenticate(authDto: AuthDto): Promise<boolean> {
    const user: User = await this.usersService.findByUsername(authDto.username);
    return !user ? false : compare(authDto.password, user.password);
  }

  async createToken(username: string): Promise<Token> {
    const date = new Date().getTime();
    const user: User = await this.usersService.findByUsername(username);
    if (!user) {
      return Promise.reject();
    }
    const jwtPayload: JwtPayload = { date, id: user.id, username: user.username };
    const token: string = jwt.sign(JSON.parse(JSON.stringify(jwtPayload)), TOKEN_SECRET, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });

    const refreshToken: string = this.generateRefreshToken(user);
    return new Token(token, TOKEN_EXPIRE_TIME, refreshToken);
  }

  private generateRefreshToken(user: User): string {
    const { id, username } = user;
    const date = new Date().getTime();
    const payload: JwtPayload = Object.assign({}, { id, username, date });
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    });
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    const { username } = payload;
    const user: User = await this.usersService.findByUsername(username);
    return user !== undefined;
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const dbUser = await this.usersService.findByUsername(signUpDto.username);
    if (dbUser) {
      throw new ConflictException();
    }
    return this.usersService.create(signUpDto).then(() => {
      return;
    });
  }
}
