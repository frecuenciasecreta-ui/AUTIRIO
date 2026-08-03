import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { SentryInterceptor } from './utils/sentry.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Managed by Nginx / Next.js
      crossOriginEmbedderPolicy: false,
    }),
  );

  // CORS Configuration
  app.enableCors({
    origin: (origin, callback) => {
      // Allow all origins for API flexibility while maintaining credentials
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global Prefix
  app.setGlobalPrefix('api');

  // Input Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Sentry Error Interceptor
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new SentryInterceptor(configService));

  // Swagger OpenAPI Docs Setup
  const config = new DocumentBuilder()
    .setTitle('AutoMaestro Enterprise API')
    .setDescription('API de alto rendimiento para plataforma de vehículos en España')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 AutoMaestro Backend running on: http://localhost:${port}/api`);
  console.log(`📚 Swagger OpenAPI documentation at: http://localhost:${port}/api/docs`);
}

bootstrap();
