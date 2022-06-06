import {HttpException, Injectable, Logger} from '@nestjs/common';
import {MovieDto} from "../movies/dto/movie.dto";
import {UpdateMovieDto} from "../movies/dto/update-movie.dto";
import {AlgoliaClientWrapper} from "./algoliaClientWrapper";

@Injectable()
export class AlgoliaService {
    private readonly logger = new Logger(AlgoliaService.name);

    constructor(private algolia: AlgoliaClientWrapper) {

    }

    async createNewMovie(movie: MovieDto): Promise<{ objectID: string, taskId: number }> {
        try {
            const result = await this.algolia.getIndex().saveObject(movie);

            let newMovie = {
                objectID: result.objectID,
                taskId: result.taskID
            };
            this.logger.log("Movie created with success", newMovie);
            return newMovie
        } catch (e) {
            this.logger.error("Fail to create a new movie", e);
            throw new Error("Unable to create movie. Please contact YAMA Administrator");
        }
    }

    async updateMovie(objectID: string, movie: UpdateMovieDto): Promise<{ objectID: string, taskId: number }> {
        try {
            const result = await this.algolia.getIndex().partialUpdateObject({
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
            const result = await this.algolia.getIndex().deleteObject(objectId);
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
