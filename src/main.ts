import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cSurf from 'csurf';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  await app.enableCors();
  await app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(cSurf());

  const config = new DocumentBuilder()
    .setTitle('Smart Booking Backend')
    .setDescription('Api for smart booking application')
    .setVersion('1.0.0')
    .addTag('SmartBooking', 'Application for appointment services online')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('sw', app, document);
  await app.listen(3000);
}
bootstrap().then();
