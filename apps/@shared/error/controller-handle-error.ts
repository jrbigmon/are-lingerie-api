import { catchError, Observable, throwError } from 'rxjs';
import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';

export class ControllerInterceptorErrorHandler implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(() => {
          const badGatewayException = new BadGatewayException(
            JSON.parse(JSON.stringify(err)),
          );

          return badGatewayException;
        }),
      ),
    );
  }
}
