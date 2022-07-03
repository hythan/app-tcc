import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENTS_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'students_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
