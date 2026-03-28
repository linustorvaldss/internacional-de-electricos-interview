import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCityDto {
  @ApiPropertyOptional({
    example: 'Bogota',
    description: 'Nuevo nombre de la ciudad',
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Nuevo id de departamento para la ciudad',
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly department_id?: number;
}