import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.ORDER_PORT || 3002;

  await app.listen(port).then(() => {
    console.log(`Orders running in port ${port}`);
  });
}
bootstrap();
