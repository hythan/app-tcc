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
    this.clientCertifcations
      .send('create-certification', {
        data: createCertificationDto,
      })
      .subscribe();
    return 'Certifications was successfuly created!';
  }

  async findAll(courseAndStudentsIds?: any) {
    return await lastValueFrom(
      this.clientCertifcations.send('find-all-certifications', {
        courseAndStudentsIds,
      }),
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
