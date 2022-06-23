export class CreateStudentDto {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  createAt?: Date | string;
  updateAt?: Date | string;
}
