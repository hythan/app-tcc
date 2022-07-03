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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  //@UseGuards(AuthGuard('jwt-student'))
  // @Get('/profile')
  // findProfile(@Request() req) {
  //   return this.studentsService.getProfile(req);
  // }

  //@UseGuards(AuthGuard('jwt-student'))
  // @Patch('/profile')
  // updateProfile(
  //   @Request() req,
  //   @Body() updateData: Prisma.StudentsUpdateInput,
  // ) {
  //   const id = this.studentsService._getUserId(req);
  //   // this.client.emit('update-student', { id: id, data: updateData });
  //   return this.studentsService.updateProfile(req, updateData);
  // }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentsService.create(createStudentDto);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get()
  async findAll() {
    return await this.studentsService.findAll();
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findBy({ where: { id: +id } });
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentsService.update(+id, updateStudentDto);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentsService.remove(+id);
  }
}
