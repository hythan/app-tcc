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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    @Inject('COURSES_SERVICE') private courseClient: ClientProxy,
    @Inject('CERTIFICATIONS_SERVICE') private certificationsClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    await this.courseClient.send('create-courses-student', {
      data: createStudentDto,
    });

    await this.certificationsClient.send('create-certifications-student', {
      data: createStudentDto,
    });
    return 'Created Student';
  }

  @Get()
  async findAll() {
    // this.certificationsClient
    //   .emit('all-certifications-students', {})
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    return await this.courseClient.emit('all-courses-students', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    await this.courseClient.send('create-courses-student', {
      id,
      data: updateStudentDto,
    });

    await this.certificationsClient.send('create-certifications-student', {
      id,
      data: updateStudentDto,
    });
    return 'Update Student';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.courseClient.send('create-courses-student', {
      id,
    });

    await this.certificationsClient.send('create-certifications-student', {
      id,
    });
    return 'Deleted Student';
  }
}
