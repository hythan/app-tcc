import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(@Inject('TEACHERS_QUEUE') private readonly client: ClientProxy) {}

  async create(createTeacherDto: CreateTeacherDto) {
    return await this.client.send('create-teacher', { data: createTeacherDto });
  }

  async findAll() {
    return await this.client.send('find-all-teachers', {});
  }

  async findOne(id: number) {
    return await this.client.send('find-teacher', { id });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return await this.client.send('update-teacher', {
      id,
      data: updateTeacherDto,
    });
  }

  async remove(id: number) {
    return await this.client.send('remove-teacher', { id });
  }
}
