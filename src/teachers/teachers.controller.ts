import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersService } from './teachers.service';

@UseGuards(AuthGuard('jwt-admin'))
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teachersService.create(createTeacherDto);
  }

  @Get()
  async findAll() {
    return await this.teachersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.teachersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return await this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.teachersService.remove(+id);
  }
}
