import { Inject, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @Inject('STUDENTS_QUEUE') private client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.client.send('create-student', {
      data: createStudentDto,
    });
  }

  async findAll() {
    return await this.client.send('all-students', {});
  }

  async findBy(params: { id?: number; email?: string }) {
    return await this.client.send('find-student', { where: params });
  }

  async getProfile(@Request() req) {
    const id = await this._getUserId(req);
    return await this.findBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.client.send('update-student', {
      id,
      data: updateStudentDto,
    });
  }

  async updateProfile(@Request() req, updateStudentDto: UpdateStudentDto) {
    const id = await this._getUserId(req);
    return await this.update(id, updateStudentDto);
  }

  async remove(id: number) {
    return await this.client.send('remove-student', {
      id,
    });
  }

  async validadeStudentUser(email: string, password: string) {
    return await lastValueFrom(
      this.client.send('validate-student', {
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
