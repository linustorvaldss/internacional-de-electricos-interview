import {
	IsBoolean,
	IsEmail,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	readonly name?: string;

	@IsEmail()
	@IsOptional()
	readonly email?: string;

	@IsString()
	@MinLength(6)
	@IsOptional()
	readonly password?: string;

	@IsBoolean()
	@IsOptional()
	readonly status?: boolean;
}
