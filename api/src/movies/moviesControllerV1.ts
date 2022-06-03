import {Body, Controller, Delete, Param, Post, Put} from '@nestjs/common';
import {MoviesService} from './movies.service';
import {MovieDto} from './dto/movie.dto';
import {UpdateMovieDto} from './dto/update-movie.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('movies')
@Controller({
    version: '1',
    path: 'movies'
})
export class MoviesControllerV1 {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Post()
    create(@Body() createMovieDto: MovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moviesService.remove(id);
    }
}
