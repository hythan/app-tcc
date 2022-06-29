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
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { ClientProxy } from '@nestjs/microservices';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return await this.registrationsService.create(createRegistrationDto);
  }

  @Get()
  async findAll() {
    return await this.registrationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.registrationsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return await this.registrationsService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.registrationsService.remove(+id);
  }
}
