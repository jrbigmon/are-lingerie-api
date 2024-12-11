import { NestFactory } from '@nestjs/core';
import { SettingsModule } from './settings.module';

async function bootstrap() {
  const app = await NestFactory.create(SettingsModule);
  const port = process.env.SETTINGS_PORT || 3001;

  await app.listen(port).then(() => {
    console.log(`Settings running in port ${port}`);
  });
}
bootstrap();
