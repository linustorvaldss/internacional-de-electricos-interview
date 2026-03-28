import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({
    example: 'Medellin',
    description: 'Nombre de la ciudad',
  })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  // @ApiProperty({
  //   example: 1,
  //   description: 'Id del departamento al que pertenece la ciudad',
  //   minimum: 1,
  // })
  @IsInt()
  @Min(1)
  readonly department_id!: number;
}