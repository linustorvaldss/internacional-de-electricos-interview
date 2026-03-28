import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsInt()
  @Min(1)
  readonly department_id!: number;
}