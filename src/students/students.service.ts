import { Inject, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENTS_COURSES_QUEUE') private clientCourse: ClientProxy,
    @Inject('STUDENTS_CERTIFICATIONS_QUEUE')
    private clientCerfications: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const res1 = await lastValueFrom(
        this.clientCourse.send('create-courses-student', {
          data: createStudentDto,
        }),
      );

      this.clientCerfications
        .send('create-certifications-student', {
          data: createStudentDto,
          id: res1.id,
        })
        .subscribe();

      return 'Student successfuly created!';
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll(studentsIds?: any) {
    return await this.clientCourse.send('all-courses-students', {
      studentsIds: studentsIds,
    });
  }

  async findBy(params: { id?: number; email?: string }) {
    return await lastValueFrom(
      this.clientCourse.send('find-courses-student', {
        where: params,
      }),
    );
  }

  async findCertificationsStudent(params: { id?: number; cpf?: string }) {
    return await lastValueFrom(
      this.clientCerfications.send('get-certifications-student', {
        params,
      }),
    );
  }

  async getProfile(@Request() req) {
    const id = await this._getUserId(req);
    const student = await this.findCertificationsStudent({ id });
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      this.clientCourse
        .send('update-courses-student', {
          id,
          data: updateStudentDto,
        })
        .subscribe();

      this.clientCerfications
        .send('update-certifications-student', {
          id,
          data: updateStudentDto,
        })
        .subscribe();
      return 'Student successfuly updated!';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateProfile(@Request() req, updateStudentDto: UpdateStudentDto) {
    const id = await this._getUserId(req);
    return await this.update(id, updateStudentDto);
  }

  async remove(id: number) {
    try {
      this.clientCourse
        .send('remove-courses-student', {
          id,
        })
        .subscribe();

      this.clientCerfications
        .send('delete-certifications-student', {
          id,
        })
        .subscribe();

      return 'Student successfuly removed!';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async validadeStudentUser(email: string, password: string) {
    const response = await lastValueFrom(
      this.clientCourse.send('validate-courses-student', {
        email,
        password,
      }),
    );
    return response;
  }

  async _getUserId(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this._getUserFromTokenStudent(token);
    return user.id;
  }

  async _getUserFromTokenStudent(token) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.STUDENT_SECRET_KEY,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
