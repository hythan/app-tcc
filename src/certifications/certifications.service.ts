import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationsService {
  constructor(
    @Inject('CERTIFICATIONS_QUEUE')
    private readonly clientCertifcations: ClientProxy,
  ) {}

  async create(createCertificationDto: CreateCertificationDto) {
    return await lastValueFrom(
      this.clientCertifcations.send('create-certification', {
        data: createCertificationDto,
      }),
    );
  }

  async findAll() {
    return await lastValueFrom(
      this.clientCertifcations.send('find-all-certifications', {}),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} certification`;
  }

  update(id: number, updateCertificationDto: UpdateCertificationDto) {
    return `This action updates a #${id} certification`;
  }

  remove(id: number) {
    return `This action removes a #${id} certification`;
  }
}
