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

      await lastValueFrom(
        this.clientCerfications.send('create-certifications-student', {
          data: createStudentDto,
          id: res1.id,
        }),
      );

      return 'Student successfuly created!';
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll() {
    await lastValueFrom(
      this.clientCerfications.send('all-certifications-students', {}),
    );
    return await this.clientCourse.send('all-courses-students', {});
  }

  async findBy(params: { id?: number; email?: string }) {
    return await this.clientCourse.send('find-courses-student', {
      where: params,
    });
  }

  async getProfile(@Request() req) {
    const id = await this._getUserId(req);
    return await this.findBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      await lastValueFrom(
        this.clientCourse.send('update-courses-student', {
          id,
          data: updateStudentDto,
        }),
      );
      await lastValueFrom(
        this.clientCerfications.send('update-certifications-student', {
          id,
          data: updateStudentDto,
        }),
      );
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
      await lastValueFrom(
        this.clientCourse.send('remove-courses-student', {
          id,
        }),
      );
      await lastValueFrom(
        this.clientCerfications.send('remove-certifications-student', {
          id,
        }),
      );
      return 'Student successfuly removed!';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async validadeStudentUser(email: string, password: string) {
    return await lastValueFrom(
      this.clientCourse.send('validate-courses-student', {
        email,
        password,
      }),
    );
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
