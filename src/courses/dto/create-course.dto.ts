export class CreateCourseDto {
  name: string;
  goal: string;
  information: string;
  requirements: string;
  duration: number;
  price: number;
  createAt?: Date | string;
  updateAt?: Date | string;
}
