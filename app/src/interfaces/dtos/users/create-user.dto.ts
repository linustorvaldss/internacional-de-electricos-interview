import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		example: 'Jose Perez',
		description: 'Nombre del usuario',
	})
	@IsString()
	@IsNotEmpty()
	readonly name!: string;

	@ApiProperty({
		example: 'usuario@email.com',
		description: 'Correo del usuario',
	})
	@IsEmail()
	@IsNotEmpty()
	readonly email!: string;

	@ApiProperty({
		example: '123456',
		description: 'Contrasena del usuario',
		minLength: 6,
	})
	@IsString()
	@MinLength(6)
	readonly password!: string;

	// @ApiPropertyOptional({
	// 	example: true,
	// 	description: 'Estado del usuario',
	// })
	@IsBoolean()
	@IsOptional()
	readonly status?: boolean;
}
