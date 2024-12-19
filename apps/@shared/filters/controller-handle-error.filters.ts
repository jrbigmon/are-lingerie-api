import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { InvalidAttribute } from '../error/invalid-attribute';
import { ProductAlreadyRegistered } from '../error/product-already-registered';

type GatewayError =
  | InvalidAttribute
  | InvalidAttribute[]
  | ProductAlreadyRegistered
  | Error
  | unknown;

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private parseMessage(error: GatewayError, path: string) {
    if (Array.isArray(error) && error[0] instanceof InvalidAttribute) {
      console.log(error[0] instanceof InvalidAttribute);
      return {
        path,
        statusCode: 400,
        timestamp: error[0].timestamp,
        message: error.map((error) => error.message)?.flatMap((error) => error),
        error,
      };
    }

    if (error instanceof InvalidAttribute) {
      return {
        path,
        statusCode: 400,
        timestamp: error.timestamp,
        message: error.message,
        error,
      };
    }

    if (error instanceof ProductAlreadyRegistered) {
      return {
        path,
        statusCode: 409,
        timestamp: error.timestamp,
        message: error.message,
        error,
      };
    }

    if (error instanceof Error) {
      return {
        path,
        statusCode: 500,
        timestamp: new Date(),
        message: 'An unexpected error occurred',
        error,
      };
    }
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody = this.parseMessage(
      exception,
      httpAdapter.getRequestUrl(ctx.getRequest()),
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
