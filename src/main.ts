import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Environment, Env } from 'roit-environment';
import { Handle } from "@roit/roit-response-handler";
import { ErrorsHandle } from './model/ErrorsHandle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Handle.register(new ErrorsHandle);
  await app.listen(Environment.getProperty("port"));
}
bootstrap();
