import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
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
  @IsNotEmpty()
  readonly password!: string;
}
