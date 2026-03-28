import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDepartmentDto {
	@ApiPropertyOptional({
		example: 'Cundinamarca',
		description: 'Nuevo nombre del departamento',
	})
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly name?: string;
}
