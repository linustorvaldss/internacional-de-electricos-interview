import { Injectable } from '@nestjs/common';
import { Department } from '@prisma/client';
import { PrismaService } from '../../infraestructure/database/prisma/prisma.service';
import { CreateDepartmentDto } from '../dtos/department/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/department/update-department.dto';
import { CustomError } from '../../domain/errors/customErros';
import { DepartmentResponse } from '../dtos/department/department-response.interface';
import { CityResponse } from '../dtos/cities/city-response.interface';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DepartmentResponse[]> {
    const departments = await this.prisma.department.findMany();
    return departments.map((dept) => this.toDepartmentResponse(dept));
  }

  async findById(id: number): Promise<DepartmentResponse> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw CustomError.notFound('Departamento no encontrado');
    }

    return this.toDepartmentResponse(department);
  }

  async create(dto: CreateDepartmentDto): Promise<DepartmentResponse> {
    const createdDepartment = await this.prisma.department.create({
      data: {
        name: dto.name,
      },
    });

    return this.toDepartmentResponse(createdDepartment);
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<DepartmentResponse> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw CustomError.notFound('Departamento no encontrado');
    }

    const updatedDepartment = await this.prisma.department.update({
      where: { id },
      data: {
        name: dto.name ?? department.name,
      },
    });

    return this.toDepartmentResponse(updatedDepartment);
  }

  async delete(id: number) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw CustomError.notFound('Departamento no encontrado');
    }

    const existInCities = await this.prisma.city.findFirst({
      where: { department_id: id },
    });

    if (existInCities) {
      throw CustomError.conflict('el departamento tiene ciudades asociadas');
    }

    await this.prisma.department.delete({
      where: { id },
    });
  }

  // async getCitiesByDepartment(id: number): Promise<CityResponse[]> {
  //   const department = await this.prisma.department.findUnique({
  //     where: { id },
  //     include: { cities: true },
  //   });

  //   if (!department) {
  //     throw CustomError.notFound('Departamento no encontrado');
  //   }

  //   return department.cities.map((city) => this.toCityResponse(city));
  // }

  private toDepartmentResponse(department: Department): DepartmentResponse {
    return {
      id: department.id,
      name: department.name,
      created_at: department.created_at,
      updated_at: department.updated_at,
    };
  }

  private toCityResponse(city: any): CityResponse {
    return {
      id: city.id,
      name: city.name,
      department_id: city.department_id,
      created_at: city.created_at,
      updated_at: city.updated_at,
    };
  }
}