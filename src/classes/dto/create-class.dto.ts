export class CreateClassDto {
  name: string;
  courseId: number;
  information: string;
  location: string;
  startDate: Date | string;
  classTimes: string;
  teacherId: number;
  createAt?: Date | string;
  updateAt?: Date | string;
}
