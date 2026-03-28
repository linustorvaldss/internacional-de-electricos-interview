import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'Antioquia',
    description: 'Nombre del departamento',
  })
  @IsString()
  @IsNotEmpty()
  readonly name!: string;
}