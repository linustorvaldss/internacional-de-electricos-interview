import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
  }

  static noContent(message: string) {
    return new CustomError(HttpStatus.NO_CONTENT, message);
  }

  static badRequest(message: string) {
    return new CustomError(HttpStatus.BAD_REQUEST, message);
  }

  static unAuthorize(message: string) {
    return new CustomError(HttpStatus.UNAUTHORIZED, message);
  }

  static forbidden(message: string) {
    return new CustomError(HttpStatus.FORBIDDEN, message);
  }

  static notFound(message: string) {
    return new CustomError(HttpStatus.NOT_FOUND, message);
  }

  static conflict(message: string) {
    return new CustomError(HttpStatus.CONFLICT, message);
  }

  static internalServer(message: string) {
    return new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}