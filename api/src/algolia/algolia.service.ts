import {Injectable} from '@nestjs/common';
import algoliasearch, {SearchClient, SearchIndex} from "algoliasearch";
import {MovieDto} from "../movies/dto/movie.dto";
import {UpdateMovieDto} from "../movies/dto/update-movie.dto";

@Injectable()
export class AlgoliaService {
    private client: SearchClient;
    private index: SearchIndex;

    constructor() {
        this.client = algoliasearch('XXXX', 'XXXXX');
        this.index = this.client.initIndex("Movies");
    }

    async createNewMovie(movie: MovieDto) {
        return this.index.saveObject(movie).wait();
    }

    async updateMovie(objectID: string, movie: UpdateMovieDto) {
        return this.index.partialUpdateObject({
            objectID,
            ...movie
        }).wait();
    }

    async deleteMovie(objectId: string) {
        return this.index.deleteObject(objectId).wait();
    }
}
