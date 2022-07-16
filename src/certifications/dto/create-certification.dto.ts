export class CreateCertificationDto {
  externalCode?: number | null;
  courseId: number;
  studentId: number;
  teacherName: string;
  createAt?: Date | string;
  updateAt?: Date | string;
}
