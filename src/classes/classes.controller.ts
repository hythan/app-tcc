import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @UseGuards(AuthGuard('jwt-admin'))
  @Post()
  async create(@Body() createClassDto: CreateClassDto) {
    return await this.classesService.create(createClassDto);
  }

  @Get(':where?')
  async findAll(@Query() where?: any) {
    return await this.classesService.findAll(where);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.classesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return await this.classesService.update(+id, updateClassDto);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.classesService.remove(+id);
  }
}
