import { Inject, Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from 'src/students/students.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private studentsService: StudentsService,
    private jwtService: JwtService,
    @Inject('AUTH_ADMINS_QUEUE') private readonly clientAdmins: ClientProxy,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    // let teste = await this.clientAdmins.send('validate-admin', {
    //   email: email,
    //   password: password,
    //   })
    //   .pipe()
    //   .toPromise();
    const teste = await lastValueFrom(
      this.clientAdmins.send('validate-admin', {
        email: email,
        password: password,
      }),
    );

    console.log(teste);
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
