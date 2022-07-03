import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard('jwt-admin'))
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.coursesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.coursesService.update(+id, updateCourseDto);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.coursesService.remove(+id);
  }
}
