import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(@Inject('ADMINS_QUEUE') private readonly client: ClientProxy) {}

  async create(createAdminDto: CreateAdminDto) {
    return await this.client.send('create-admin', { data: createAdminDto });
  }

  async findAll() {
    return await this.client.send('find-all-admins', {});
  }

  async findBy(params: { where: { id?; email? } }) {
    return await this.client.send('find-admin', { where: params.where });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return await this.client.send('update-admin', {
      id: id,
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    return await this.client.send('remove-admin', { id: id });
  }

  async validadeAdminUser(email, password) {
    return await lastValueFrom(
      this.client.send('validate-admin', {
        email,
        password,
      }),
    );
  }
}
