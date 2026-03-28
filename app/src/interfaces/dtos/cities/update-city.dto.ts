import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCityDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  readonly department_id?: number;
}