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
    const response = await lastValueFrom(
      this.clientCertifcations.send('create-certification', {
        data: createCertificationDto,
      }),
    );
    return response;
  }

  async findAll(courseId?: any) {
    return await lastValueFrom(
      this.clientCertifcations.send('find-all-certifications', { courseId }),
    );
  }

  async findOne(id: number) {
    return await lastValueFrom(
      this.clientCertifcations.send('find-certification', { id }),
    );
  }

  async update(id: number, updateCertificationDto: UpdateCertificationDto) {
    return await lastValueFrom(
      this.clientCertifcations.send('update-certification', {
        id,
        data: updateCertificationDto,
      }),
    );
  }

  async remove(id: number) {
    return await this.clientCertifcations.send('remove-certifications', { id });
  }
}
