import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { EnvironmentVariables } from '@/config/env.variables';
import { SocketIoAdapter } from '@/config/socket-io.adapter';
import { setupSwagger } from '@/config/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<EnvironmentVariables, true>);

  const frontendUrl = config.get('FRONTEND_URL', { infer: true });

  app.setGlobalPrefix('api');
  app.enableCors({ origin: frontendUrl });
  app.useWebSocketAdapter(new SocketIoAdapter(app, frontendUrl));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);

  const port = config.get('PORT', { infer: true });
  await app.listen(port);
  Logger.log(`API running on http://localhost:${port}/api`, 'Bootstrap');
  Logger.log(`Swagger docs on http://localhost:${port}/api/docs`, 'Bootstrap');
}

void bootstrap();
