import { Inject, Injectable, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(@Inject('STUDENTS_QUEUE') private client: ClientProxy) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.client.send('create-student', {
      data: createStudentDto,
    });
  }

  async findAll() {
    return await this.client.send('all-students', {});
  }

  async findBy(params: { where: { id?; email? } }) {
    return await this.client.send('find-student', { where: params.where });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.client.send('update-student', {
      id,
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return await this.client.send('remove-student', {
      id,
    });
  }

  async validadeStudentUser(email: string, password: string) {
    return await this.client.send('validade-student', { email, password });
  }

  // async _getUserId(@Request() req) {
  //   const token = req.headers.authorization.split(' ')[1];
  //   const user = await this._getUserFromTokenStudent(token);
  //   return user.id;
  // }

  // async _getUserFromTokenStudent(token) {
  //   try {
  //     return await this.jwtService.verifyAsync(token, {
  //       secret: process.env.STUDENT_SECRET_KEY,
  //     });
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // }
}
