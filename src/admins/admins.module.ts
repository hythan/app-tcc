import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMINS_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@rabbitmq:5672'],
          queue: 'admins_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
