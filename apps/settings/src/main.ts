import { NestFactory } from '@nestjs/core';
import { SettingsModule } from './settings.module';

async function bootstrap() {
  const app = await NestFactory.create(SettingsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
