/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { ApiService } from './app/api/api.service';
import { AppModule } from './app/app.module';
import { Pagination } from './app/common/classes/pagination.class';

async function bootstrap() {
  // Creates NestJS app instance
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  // Set Global prefix to api
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  //Activate global endpoints validation
  app.useGlobalPipes(new ValidationPipe());

  // Defines the OpenAPI document, and sets it to the Nest app.
  const options: Pick<OpenAPIObject, 'openapi' | 'components' | 'externalDocs' | 'info' | 'servers' | 'tags'> =
    ApiService.buildDocument();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, options, { extraModels: [Pagination] });
  SwaggerModule.setup(ApiService.getDocsEndpoint(), app, document);

  await app.listen(port, () => {
    Logger.log(`¡¡¡ Swagger DOC is available at http://localhost:${port}/${ApiService.getDocsEndpoint()} !!!`);
    Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
  });
}

bootstrap();
