import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from 'src/admins/admins.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminStrategy } from './admin.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStrategy } from './admin-jwt.strategy';
import { StudentsModule } from 'src/students/students.module';
import { StudentStrategy } from './student.strategy';
import { StudentJwtStrategy } from './student-jwt.strategy';

@Module({
  imports: [AdminsModule, StudentsModule, PassportModule, JwtModule],
  providers: [
    AuthService,
    AdminStrategy,
    StudentStrategy,
    AdminJwtStrategy,
    StudentJwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
