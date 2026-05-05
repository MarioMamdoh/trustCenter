import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HandleErorrs } from './Interceptors/handleErorr.Interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new HandleErorrs());
  app.enableCors({
    origin: '*', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  });
  app.use(json({ limit: '50mb' })); // Increase JSON payload limit
  app.use(urlencoded({ extended: true, limit: '50mb' })); // Increase URL-encoded payload limit

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap();
