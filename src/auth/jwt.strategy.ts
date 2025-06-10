// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // auto reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'secret', // Use env var in real apps
    });
  }

  async validate(payload: any) {
    // payload is what you sign into the token
    const user = { id: payload.sub, username: payload.username };
    return { userId: user.id, username: user.username };
  }
}
