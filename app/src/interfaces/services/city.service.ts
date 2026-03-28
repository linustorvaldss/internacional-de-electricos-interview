import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from '../../infraestructure/database/prisma/prisma.service';
import { CreateCityDto } from '../dtos/cities/create-city.dto';
import { UpdateCityDto } from '../dtos/cities/update-city.dto';
import { CustomError } from '../../domain/errors/customErros';
import { CityResponse } from '../dtos/cities/city-response.interface';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CityResponse[]> {
    const cities = await this.prisma.city.findMany();
    return cities.map((city) => this.toCityResponse(city));
  }

  async findById(id: number): Promise<CityResponse> {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      throw CustomError.notFound('Ciudad no encontrada');
    }

    return this.toCityResponse(city);
  }

  async create(dto: CreateCityDto): Promise<CityResponse> {
    const departmentExists = await this.prisma.department.findUnique({
      where: { id: dto.department_id },
    });

    if (!departmentExists) {
      throw CustomError.notFound('Departamento no encontrado');
    }

    const createdCity = await this.prisma.city.create({
      data: {
        name: dto.name,
        department_id: dto.department_id,
      },
    });

    return this.toCityResponse(createdCity);
  }

  async findCitiesByDepartment(departmentId: number): Promise<CityResponse[]> {
    const departmentExists = await this.prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!departmentExists) {
      throw CustomError.notFound('Departamento no encontrado');
    }
    const cities = await this.prisma.city.findMany({
      where: { department_id: departmentId },
    });
    return cities.map((city) => this.toCityResponse(city));
  }


  async update(id: number, dto: UpdateCityDto): Promise<CityResponse> {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      throw CustomError.notFound('Ciudad no encontrada');
    }

    if (dto.name) {
      const cityWithSameName = await this.prisma.city.findFirst({
        where: {
          name: dto.name,
          department_id: dto.department_id ?? city.department_id,
        },
      });

      if (cityWithSameName && cityWithSameName.id !== id) {
        throw CustomError.conflict('la ciudad con ya existe en este departamento');
      }
    }

    if (dto.department_id) {
      const departmentExists = await this.prisma.department.findUnique({
        where: { id: dto.department_id },
      });

      if (!departmentExists) {
        throw CustomError.notFound('Departamento no encontrado');
      }
    }

    const updatedCity = await this.prisma.city.update({
      where: { id },
      data: {
        name: dto.name ?? city.name,
        department_id: dto.department_id ?? city.department_id,
      },
    });

    return this.toCityResponse(updatedCity);
  }

  async delete(id: number): Promise<void> {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });

    if (!city) {
      throw CustomError.notFound('Ciudad no encontrada');
    }

    await this.prisma.city.delete({
      where: { id },
    });
  }

  private toCityResponse(city: City): CityResponse {
    return {
      id: city.id,
      name: city.name,
      department_id: city.department_id,
      created_at: city.created_at,
      updated_at: city.updated_at,
    };
  }
}