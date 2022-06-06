import {Body, Controller, Delete, Param, Post, Put} from '@nestjs/common';
import {MovieDto} from './dto/movie.dto';
import {UpdateMovieDto} from './dto/update-movie.dto';
import {ApiTags} from "@nestjs/swagger";
import {AlgoliaService} from "../algolia/algolia.service";

@ApiTags('movies')
@Controller({
    version: '1',
    path: 'movies'
})
export class MoviesControllerV1 {
    constructor(private readonly algoliaService: AlgoliaService) {
    }

    @Post()
    create(@Body() createMovieDto: MovieDto) {
        return this.algoliaService.createNewMovie(createMovieDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.algoliaService.updateMovie(id, updateMovieDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.algoliaService.deleteMovie(id);
    }
}
