import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom, timeout } from 'rxjs';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_QUEUE') private readonly clientCourse: ClientProxy,
    @Inject('COURSES_CERTIFICATIONS_QUEUE')
    private readonly clientCerfications: ClientProxy,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const response = await lastValueFrom(
        await this.clientCourse.send('create-course', {
          data: createCourseDto,
        }),
      );

      this.clientCerfications
        .send('create-certifications-course', {
          data: createCourseDto,
          id: response.id,
        })
        .subscribe();

      return 'Sucessfully created course';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    this.clientCerfications
      .send('find-all-certifications-courses', {})
      .subscribe();

    return await lastValueFrom(this.clientCourse.send('find-all-courses', {}));
  }

  async findOne(id: number) {
    return await this.clientCourse.send('find-course', { id });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    this.clientCerfications
      .send('update-certifications-course', {
        id,
        data: updateCourseDto,
      })
      .subscribe();

    this.clientCourse
      .send('update-course', {
        id,
        data: updateCourseDto,
      })
      .subscribe();
  }

  async remove(id: number) {
    this.clientCerfications
      .send('remove-certifications-course', { id })
      .subscribe();

    this.clientCourse.send('remove-course', { id }).subscribe();
    return '';
  }
}
