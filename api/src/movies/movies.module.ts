import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesControllerV1 } from './moviesControllerV1';
import {AlgoliaService} from "../algolia/algolia.service";

@Module({
  exports: [MoviesModule],
  controllers: [MoviesControllerV1],
  providers: [MoviesService, AlgoliaService],
})

export class MoviesModule {}
