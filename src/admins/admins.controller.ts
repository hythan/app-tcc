import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Request,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
    @Inject('COURSES_SERVICE') private readonly client: ClientProxy,
  ) {}

  // @Post('/login')
  // async login(@Request() req) {
  //   return await this.client.send('admin-login', { data: req });
  // }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.client.send('create-admin', { data: createAdminDto });
  }

  @Get()
  async findAll() {
    return await this.client.send('find-all-admins', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.client.send('find-admin', { id: id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.client.send('update-admin', {
      id: id,
      data: updateAdminDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.client.send('remove-admin', { id: id });
  }
}
