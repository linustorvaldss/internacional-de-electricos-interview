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
import { CityService } from '../services/city.service';
import { CreateCityDto } from '../dtos/cities/create-city.dto';
import { UpdateCityDto } from '../dtos/cities/update-city.dto';
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

@ApiTags('Cities')
@ApiBearerAuth()
@Controller('cities')
export class CitiesController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiOperation({ summary: 'Crear ciudad' })
  @ApiCreatedResponse({ description: 'Ciudad creada exitosamente.' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos.' })
  create(@Body() dto: CreateCityDto) {
    return this.cityService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar ciudades' })
  @ApiOkResponse({ description: 'Listado de ciudades.' })
  findAll() {
    return this.cityService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Obtener ciudad por id' })
  // @ApiParam({ name: 'id', type: Number, example: 1 })
  // @ApiOkResponse({ description: 'Ciudad encontrada.' })
  // @ApiNotFoundResponse({ description: 'Ciudad no encontrada.' })
  // findById(@Param('id', ParseIntPipe) id: number) {
  //   return this.cityService.findById(id);
  // }

  @Get('department/:departmentId')
  @ApiOperation({ summary: 'Listar ciudades por departamento' })
  @ApiParam({ name: 'departmentId', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Listado de ciudades filtradas por departamento.' })
  @ApiNotFoundResponse({ description: 'Departamento no encontrado.' })
  findCitiesByDepartment(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.cityService.findCitiesByDepartment(departmentId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar ciudad' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Ciudad actualizada.' })
  @ApiBadRequestResponse({ description: 'Datos de entrada inválidos.' })
  @ApiNotFoundResponse({ description: 'Ciudad no encontrada.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCityDto,
  ) {
    return this.cityService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar ciudad' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Ciudad eliminada.' })
  @ApiNotFoundResponse({ description: 'Ciudad no encontrada.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.delete(id);
  }
}