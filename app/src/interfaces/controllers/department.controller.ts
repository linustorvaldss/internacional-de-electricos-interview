import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto } from '../dtos/department/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/department/update-department.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Departments')
@ApiBearerAuth()
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear departamento' })
  @ApiCreatedResponse({ description: 'Departamento creado exitosamente.' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos.' })
  create(@Body() dto: CreateDepartmentDto) {
    return this.departmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar departamentos' })
  @ApiOkResponse({ description: 'Listado de departamentos.' })
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener departamento por id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Departamento encontrado.' })
  @ApiNotFoundResponse({ description: 'Departamento no encontrado.' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.findById(id);
  }

  // @Get(':id/cities')
  // getCitiesByDepartment(@Param('id', ParseIntPipe) id: number) {
  //   return this.departmentService.getCitiesByDepartment(id);
  // }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar departamento' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Departamento actualizado.' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos.' })
  @ApiNotFoundResponse({ description: 'Departamento no encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar departamento' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Departamento eliminado.' })
  @ApiNotFoundResponse({ description: 'Departamento no encontrado.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.departmentService.delete(id);
  }
}