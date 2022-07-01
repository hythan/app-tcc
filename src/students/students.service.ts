import { Inject, Injectable, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(@Inject('STUDENTS_QUEUE') private courseClient: ClientProxy) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.courseClient.send('create-student', {
      data: createStudentDto,
    });
  }

  async findAll() {
    return await this.courseClient.send('all-students', {});
  }

  async findOne(id: number) {
    return await this.courseClient.send('find-student', { id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.courseClient.send('update-student', {
      id,
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return await this.courseClient.send('remove-student', {
      id,
    });
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
