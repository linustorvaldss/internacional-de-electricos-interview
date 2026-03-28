import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infraestructure/database/prisma/prisma.service';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { CustomError } from '../../domain/errors/customErros';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const userEmailExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userEmailExists) {
      throw CustomError.conflict('el correo del usuario ya existe');
    }

    const createdUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        status: dto.status ?? true,
      },
    });

    return createdUser
  }

}
