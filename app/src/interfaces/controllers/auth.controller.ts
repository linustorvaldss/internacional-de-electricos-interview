import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { LoginUserDto } from '../dtos/users/login-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.createUser(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

}