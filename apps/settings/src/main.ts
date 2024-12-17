import { NestFactory } from '@nestjs/core';
import { SettingsModule } from './settings.module';
import { ControllerInterceptorErrorHandler } from '../../@shared/error/controller-handle-error';

async function bootstrap() {
  const app = await NestFactory.create(SettingsModule);
  const port = process.env.SETTINGS_PORT || 3001;

  app.useGlobalInterceptors(new ControllerInterceptorErrorHandler());

  await app.listen(port).then(() => {
    console.log(`Settings running in port ${port}`);
  });
}
bootstrap();
