import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(['admin', 'student']) {
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
