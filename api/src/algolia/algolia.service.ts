import {Injectable} from '@nestjs/common';
import algoliasearch, {SearchClient, SearchIndex} from "algoliasearch";
import {MovieDto} from "../movies/dto/movie.dto";
import {UpdateMovieDto} from "../movies/dto/update-movie.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AlgoliaService {
    private client: SearchClient;
    private index: SearchIndex;

    constructor(private configService: ConfigService) {
        this.client = algoliasearch(configService.get<string>('ALGOLIA_APP_ID'), configService.get<string>('ALGOLIA_SECRET_KEY'));
        this.index = this.client.initIndex("Movies");
    }

    createNewMovie(movie: MovieDto) {
        return this.index.saveObject(movie).wait();
    }

    updateMovie(objectID: string, movie: UpdateMovieDto) {
        return this.index.partialUpdateObject({
            objectID,
            ...movie
        }).wait();
    }

    deleteMovie(objectId: string) {
        return this.index.deleteObject(objectId).wait();
    }
}
