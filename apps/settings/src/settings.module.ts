import { Module } from '@nestjs/common';
import { BagModule } from './application/bag/bag.module';

@Module({
  imports: [BagModule],
})
export class SettingsModule {}
