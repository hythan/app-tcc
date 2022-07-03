import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('admins/login')
  async loginAdmin(@Request() req) {
    return this.authService.loginAdmin(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('students/login')
  async loginStudent(@Request() req) {
    return this.authService.loginStudent(req.user);
  }
}
