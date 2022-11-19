import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local-admin'))
  @Post('admins/login')
  async loginAdmin(@Request() req) {
    return this.authService.loginAdmin(req.user);
  }

  @UseGuards(AuthGuard('local-student'))
  @Post('students/login')
  async loginStudent(@Request() req) {
    return this.authService.loginStudent(req.user);
  }
}
