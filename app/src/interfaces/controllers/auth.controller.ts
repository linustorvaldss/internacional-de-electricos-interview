import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { LoginUserDto } from '../dtos/users/login-user.dto';
import { AuthService } from '../services/auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario' })
  @ApiCreatedResponse({ description: 'Usuario creado exitosamente.' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos.' })
  register(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiOkResponse({ description: 'Login exitoso con token JWT.' })
  @ApiBadRequestResponse({ description: 'Credenciales inválidas.' })
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

}