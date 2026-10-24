import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { EnvironmentVariables } from '@/config/env.variables';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<EnvironmentVariables, true>);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: config.get('FRONTEND_URL', { infer: true }) });

  const port = config.get('PORT', { infer: true });
  await app.listen(port);
  Logger.log(`API running on http://localhost:${port}/api`, 'Bootstrap');
}

void bootstrap();
