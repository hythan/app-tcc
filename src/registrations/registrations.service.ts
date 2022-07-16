import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationsService {
  constructor(
    @Inject('REGISTRATIONS_QUEUE') private readonly clientCourses: ClientProxy,
  ) {}

  async create(createRegistrationDto: CreateRegistrationDto) {
    return await this.clientCourses.send('create-registration', {
      data: createRegistrationDto,
    });
  }

  async findAll() {
    return await this.clientCourses.send('find-all-registrations', {});
  }

  async findOne(id: number) {
    return await lastValueFrom(
      this.clientCourses.send('find-registration', { id }),
    );
  }

  async update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return lastValueFrom(
      await this.clientCourses.send('update-registration', {
        id,
        data: updateRegistrationDto,
      }),
    );
  }

  async remove(id: number) {
    return await this.clientCourses.send('remove-registration', { id });
  }
}
