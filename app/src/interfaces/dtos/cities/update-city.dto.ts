import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCityDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly department_id?: number;
}