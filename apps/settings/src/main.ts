import { NestFactory } from '@nestjs/core';
import { SettingsModule } from './settings.module';

async function bootstrap() {
  const app = await NestFactory.create(SettingsModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
