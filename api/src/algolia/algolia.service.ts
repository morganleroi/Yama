import {HttpException, Injectable, Logger} from '@nestjs/common';
import algoliasearch, {SearchClient, SearchIndex} from "algoliasearch";
import {MovieDto} from "../movies/dto/movie.dto";
import {UpdateMovieDto} from "../movies/dto/update-movie.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AlgoliaService {
    private client: SearchClient;
    private index: SearchIndex;
    private readonly logger = new Logger(AlgoliaService.name);

    constructor(private configService: ConfigService) {
        this.client = algoliasearch(configService.get<string>('ALGOLIA_APP_ID'), configService.get<string>('ALGOLIA_SECRET_KEY'));
        this.index = this.client.initIndex("Movies");
    }

    async createNewMovie(movie: MovieDto): Promise<{ objectID: string, taskId: number }> {
        try {
            const result = await this.index.saveObject(movie);

            let newMovie = {
                objectID: result.objectID,
                taskId: result.taskID
            };
            this.logger.log("Movie created with success", newMovie);
            return newMovie
        } catch (e) {
            this.logger.error("Fail to create a new movie", e);
            throw new HttpException("Unable to create movie. Please contact YAMA Administrator", e.status);
        }
    }

    async updateMovie(objectID: string, movie: UpdateMovieDto): Promise<{ objectID: string, taskId: number }> {
        try {
            const result = await this.index.partialUpdateObject({
                objectID,
                ...movie
            });

            let updatedMovie = {
                objectID: result.objectID,
                taskId: result.taskID
            };
            this.logger.log("Movie updated with succes", updatedMovie);
            return updatedMovie
        } catch (e) {
            this.logger.error("Fail to update a new movie", e);
            throw new HttpException("Unable to update movie. Please contact YAMA Administrator", e.status);
        }
    }

    async deleteMovie(objectId: string): Promise<{ taskId: number }> {
        try {
            const result = await this.index.deleteObject(objectId);
            let deletedMovie = {
                taskId: result.taskID
            };
            this.logger.log("Movie deleted with success", deletedMovie);
            return deletedMovie;
        } catch (e) {
            this.logger.error("Fail to delete a movie", e);
            throw new HttpException("Unable to delete movie. Please contact YAMA Administrator", e.status);
        }
    }
}
