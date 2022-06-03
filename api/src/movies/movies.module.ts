import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesControllerV1 } from './moviesControllerV1';
import {AlgoliaService} from "../algolia/algolia.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  exports: [MoviesModule],
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.dev.local', '.env'],
  })],
  controllers: [MoviesControllerV1],
  providers: [MoviesService, AlgoliaService],
})

export class MoviesModule {}
