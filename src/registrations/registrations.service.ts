import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationsService {
  constructor(
    @Inject('REGISTRATIONS_QUEUE') private readonly client: ClientProxy,
  ) {}

  async create(createRegistrationDto: CreateRegistrationDto) {
    return await this.client.send('create-registration', {
      data: createRegistrationDto,
    });
  }

  async findAll() {
    return await this.client.send('find-all-registrations', {});
  }

  async findOne(id: number) {
    return await this.client.send('find-registration', { id });
  }

  async update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return await this.client.send('update-registration', {
      id,
      data: updateRegistrationDto,
    });
  }

  async remove(id: number) {
    return await this.client.send('remove-registration', { id });
  }
}
