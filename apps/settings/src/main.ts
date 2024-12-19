import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SettingsModule } from './settings.module';
import { CatchEverythingFilter } from '../../@shared/filters/controller-handle-error.filters';

async function bootstrap() {
  const app = await NestFactory.create(SettingsModule);
  const port = process.env.SETTINGS_PORT || 3001;

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));

  await app.listen(port).then(() => {
    console.log(`Settings running in port ${port}`);
  });
}
bootstrap();
