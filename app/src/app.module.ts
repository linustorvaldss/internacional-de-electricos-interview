import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infraestructure/database/prisma/prisma.module';
import { AuthController } from './interfaces/controllers/auth.controller';
import { CitiesController } from './interfaces/controllers/city.controller';
import { DepartmentsController } from './interfaces/controllers/department.controller';
import { AuthService } from './interfaces/services/auth.service';
import { CityService } from './interfaces/services/city.service';
import { DepartmentService } from './interfaces/services/department.service';
import { JwtStrategy } from './interfaces/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './interfaces/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    CitiesController,
    DepartmentsController,
  ],
  providers: [
    AppService,
    AuthService,
    CityService,
    DepartmentService,
    JwtStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        // Auth
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/profile', method: RequestMethod.GET },

        // Cities
        { path: 'cities', method: RequestMethod.POST },
        { path: 'cities', method: RequestMethod.GET },
        { path: 'cities/:id', method: RequestMethod.GET },
        { path: 'cities/by-department/:departmentId', method: RequestMethod.GET },
        { path: 'cities/:id', method: RequestMethod.PATCH },
        { path: 'cities/:id', method: RequestMethod.DELETE },

        // Departments
        { path: 'departments', method: RequestMethod.POST },
        { path: 'departments', method: RequestMethod.GET },
        { path: 'departments/:id', method: RequestMethod.GET },
        { path: 'departments/:id/cities', method: RequestMethod.GET },
        { path: 'departments/:id', method: RequestMethod.PATCH },
        { path: 'departments/:id', method: RequestMethod.DELETE },
      );
  }
}
