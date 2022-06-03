import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";
import {MoviesModule} from "./movies/movies.module";

async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  app.enableVersioning();
  app.enableCors();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
        controllerKey: string,
        methodKey: string
    ) => methodKey
  };

  const config = new DocumentBuilder()
      .setTitle('Yama')
      .setDescription('The awesome Yama API')
      .setVersion('1.0')
      .addTag('movies')
      .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8080);
}


bootstrap();
