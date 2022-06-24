import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(@Inject('COURSES_QUEUE') private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.client.send('create-course', { data: createCourseDto });
  }

  @Get()
  async findAll() {
    return await this.client.send('create-course', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.client.send('find-course', { id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.client.send('update-course', {
      id,
      data: updateCourseDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.client.send('remove-course', { id });
  }
}
