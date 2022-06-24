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

@Controller('registrations')
export class RegistrationsController {
  constructor(
    @Inject('REGISTRATIONS_QUEUE') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return await this.client.send('create-registration', {
      data: createRegistrationDto,
    });
  }

  @Get()
  async findAll() {
    return await this.client.send('find-all-registrations', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.client.send('find-registration', { id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return await this.client.send('update-registration', {
      id,
      data: updateRegistrationDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.client.send('remove-registration', { id });
  }
}
