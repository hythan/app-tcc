import { Inject, Injectable } from '@nestjs/common';
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
    return await this.courseClient.send('find-students', {});
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.courseClient.send('create-courses-student', {
      id,
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return await this.courseClient.send('create-courses-student', {
      id,
    });
  }
}
