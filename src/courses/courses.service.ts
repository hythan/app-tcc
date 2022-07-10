import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
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
      await this.clientCerfications.send('create-certifications-course', {
        data: createCourseDto,
        id: response.id,
      });

      return 'Sucessfully created course';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    return await this.clientCourse.send('find-all-courses', {});
  }

  async findOne(id: number) {
    return await this.clientCourse.send('find-course', { id });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.clientCourse.send('update-course', {
      id,
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    return await this.clientCourse.send('remove-course', { id });
  }
}
