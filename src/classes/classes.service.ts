import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(@Inject('CLASSES_QUEUE') private readonly client: ClientProxy) {}

  async create(createClassDto: CreateClassDto) {
    return await this.client.send('create-class', { data: createClassDto });
  }

  async findAll() {
    return await this.client.send('find-all-classes', {});
  }

  async findOne(id: number) {
    return await this.client.send('find-class', { id });
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    if (typeof updateClassDto.startDate == 'string') {
      updateClassDto.startDate = new Date(updateClassDto.startDate);
    }

    return await this.client.send('update-class', { id, data: updateClassDto });
  }

  async remove(id: number) {
    return await this.client.send('remove-class', { id });
  }
}
