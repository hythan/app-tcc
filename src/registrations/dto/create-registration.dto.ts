export class CreateRegistrationDto {
  complete?: boolean;
  classId: number;
  studentId: number;
  createAt?: Date | string;
  updateAt?: Date | string;
}
