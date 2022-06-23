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
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('teachers')
export class TeachersController {
  constructor(@Inject('TEACHERS_QUEUE') private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.client.send('create-teacher', { data: createTeacherDto });
  }

  @Get()
  async findAll() {
    return await this.client.send('find-all-teachers', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.client.send('find-teacher', { id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return await this.client.send('update-teacher', {
      id,
      data: updateTeacherDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.client.send('remove-teacher', { id });
  }
}
