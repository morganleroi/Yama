import { Injectable } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {AlgoliaService} from "../algolia/algolia.service";

@Injectable()
export class MoviesService {

  constructor(private readonly algoliaService: AlgoliaService) {
  }

  create(createMovieDto: MovieDto) {
    return this.algoliaService.createNewMovie(createMovieDto);
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.algoliaService.updateMovie(id, updateMovieDto)
  }

  remove(id: string) {
    return this.algoliaService.deleteMovie(id)
  }
}
