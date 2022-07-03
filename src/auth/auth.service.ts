import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private studentsService: StudentsService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    return await this.adminsService.validadeAdminUser(email, password);
  }

  async validadeStudent(email: string, password: string): Promise<any> {
    return await this.studentsService.validadeStudentUser(email, password);
  }

  async loginAdmin(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.ADMIN_SECRET_KEY,
        expiresIn: '4800s',
      }),
    };
  }

  async loginStudent(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.STUDENT_SECRET_KEY,
        expiresIn: '3600s',
      }),
    };
  }
}
