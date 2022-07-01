import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(@Inject('COURSES_QUEUE') private readonly client: ClientProxy) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.client.send('create-course', { data: createCourseDto });
  }

  async findAll() {
    return await this.client.send('find-all-courses', {});
  }

  async findOne(id: number) {
    return await this.client.send('find-course', { id });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.client.send('update-course', {
      id,
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    return await this.client.send('remove-course', { id });
  }
}
