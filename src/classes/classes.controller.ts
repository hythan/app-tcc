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
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(
    @Inject('CLASSES_QUEUE_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.client.send('create-class', { data: createClassDto });
  }

  @Get()
  async findAll() {
    return await this.client.send('find-all-classes', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.client.send('find-class', { id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return await this.client.send('update-class', { id, data: updateClassDto });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.client.send('remove-class', { id });
  }
}
