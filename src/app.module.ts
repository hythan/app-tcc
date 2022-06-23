import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';
import { TeachersModule } from './teachers/teachers.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
    AdminsModule,
    StudentsModule,
    ClassesModule,
    CoursesModule,
    TeachersModule,
    RegistrationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
