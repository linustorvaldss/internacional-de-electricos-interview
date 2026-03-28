import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../infraestructure/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { LoginUserDto } from '../dtos/users/login-user.dto';
import { CustomError } from '../../domain/errors/customErros';
import { UserResponse } from '../dtos/users/response-user.interface.js';
import { LoginResponse } from '../dtos/users/login-response.interface';
import { JwtGenerator } from '../../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const userEmailExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userEmailExists) {
      throw CustomError.conflict('el correo del usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        status: dto.status ?? true,
      },
    });

    return this.toUserResponse(createdUser);
  }

  async login(dto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw CustomError.unAuthorize('credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw CustomError.unAuthorize('credenciales incorrectas');
    }

    const token = (await JwtGenerator.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
    })) as string;

    return {
      user: this.toUserResponse(user),
      token,
    };
  }

  private toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}