import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as mongoose from 'mongoose';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return throwError(
            () =>
              new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Validation Error',
                  message: error.message,
                },
                HttpStatus.BAD_REQUEST,
              ),
          );
        }
        if (error instanceof mongoose.Error.CastError) {
          return throwError(
            () =>
              new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'Invalid ID',
                  message: 'The provided ID is invalid',
                },
                HttpStatus.BAD_REQUEST,
              ),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
