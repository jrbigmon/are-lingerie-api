import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as mongoose from 'mongoose';

const services: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DATABASE_MONGODB_HOST),
  },
];

@Module({
  imports: [ConfigModule.forRoot()],
  providers: services,
  exports: services,
})
export class DatabaseModule {}
