import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TOKEN_SECRET } from '../auth.constants';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../classes/jwt-payload.class';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: TOKEN_SECRET,
      },
      async (req, payload, next): Promise<boolean> => this.verify(req, payload, next),
    );
    passport.use(this);
  }

  async verify(req, payload: JwtPayload, done) {
    const isValid = await this.authService.validateUser(payload);
    if (!isValid) {
      return done(null, false);
    }
    return done(null, payload);
  }
}
