export class CreateClassDto {
  name: string;
  information: string;
  location: string;
  startDate: Date | string;
  classTimes: string;
  createAt?: Date | string;
  updateAt?: Date | string;
}
