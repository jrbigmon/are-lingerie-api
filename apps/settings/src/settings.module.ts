import { Module } from '@nestjs/common';
import { BagModule } from './application/bag/bag.module';
import { ProductModule } from './application/product/product.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ControllerInterceptorErrorHandler } from '../../@shared/error/controller-handle-error';

@Module({
  imports: [BagModule, ProductModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ControllerInterceptorErrorHandler,
    },
  ],
})
export class SettingsModule {}
