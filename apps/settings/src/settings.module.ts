import { Module } from '@nestjs/common';
import { BagModule } from './application/bag/bag.module';
import { ProductModule } from './application/product/product.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from '../../@shared/filters/controller-handle-error.filters';

@Module({
  imports: [BagModule, ProductModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class SettingsModule {}
