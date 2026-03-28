import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	readonly name?: string;
}
