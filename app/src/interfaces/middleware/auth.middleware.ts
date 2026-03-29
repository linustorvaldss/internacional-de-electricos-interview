import { JwtGenerator } from '../../config/jwt.config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomError } from '../../domain/errors/customErros';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw CustomError.unAuthorize('Token no proporcionado');
    }

    const decoded = await JwtGenerator.validateToken(token);
    if (!decoded) {
      throw CustomError.unAuthorize('Token inválido');
    }

    req.user = decoded;
    next();
  }
}

