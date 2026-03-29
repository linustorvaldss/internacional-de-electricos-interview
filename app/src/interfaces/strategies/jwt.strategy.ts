import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserResponse } from '../dtos/users/response-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SEED || 'fallback-secret',
    });
  }

  async validate(payload: any): Promise<UserResponse> {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      status: payload.status,
      created_at: payload.created_at,
      updated_at: payload.updated_at,
    };
  }
}
