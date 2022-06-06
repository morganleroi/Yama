import { Module } from '@nestjs/common';
import { MoviesControllerV1 } from './movies/moviesControllerV1';
import {AlgoliaService} from "./algolia/algolia.service";
import {ConfigModule} from "@nestjs/config";
import {AlgoliaClientWrapper} from "./algolia/algoliaClientWrapper";

@Module({
  exports: [AppModule],
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.dev.local', '.env'],
  })],
  controllers: [MoviesControllerV1],
  providers: [AlgoliaService, AlgoliaClientWrapper],
})

export class AppModule {}
