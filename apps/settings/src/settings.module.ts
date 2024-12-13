import { Module } from '@nestjs/common';
import { BagModule } from './application/bag/bag.module';
import { ProductModule } from './application/product/product.module';

@Module({
  imports: [BagModule, ProductModule],
})
export class SettingsModule {}
