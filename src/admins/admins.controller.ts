import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@UseGuards(AuthGuard('jwt-admin'))
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('/user')
  async user(@Request() req: any) {
    return {
      user: {
        id: req.user.adminId,
        email: req.user.email,
      },
    };
  }

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminsService.create(createAdminDto);
  }

  @Get()
  async findAll() {
    return await this.adminsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminsService.findBy({ where: { id: +id } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return await this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.adminsService.remove(+id);
  }
}
