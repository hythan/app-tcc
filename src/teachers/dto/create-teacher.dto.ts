export class CreateTeacherDto {
  id?: string;
  name: string;
  email: string;
  curriculum: string;
  createAt?: Date | string;
  updateAt?: Date | string;
}
