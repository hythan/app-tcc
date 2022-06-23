export class CreateAdminDto {
  id?: number;
  name: string;
  email: string;
  password: string;
  createAt?: Date | string;
  updateAt?: Date | string;
}
