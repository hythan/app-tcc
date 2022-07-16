import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';
import { TeachersModule } from './teachers/teachers.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CertificationsModule } from './certifications/certifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminsModule,
    StudentsModule,
    ClassesModule,
    CoursesModule,
    TeachersModule,
    RegistrationsModule,
    AuthModule,
    CertificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
