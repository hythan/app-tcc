import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class StudentJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-student',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.STUDENT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { studentId: payload.id, email: payload.email };
  }
}
