import {Test, TestingModule} from '@nestjs/testing';
import {AlgoliaService} from './algolia.service';
import {ConfigModule} from '@nestjs/config';
import {AlgoliaClientWrapper} from './algoliaClientWrapper';
import {MovieDto} from '../movies/dto/movie.dto';
import {UpdateMovieDto} from '../movies/dto/update-movie.dto';

describe('AlgoliaService', () => {
    let service: AlgoliaService;
    let algoliaClient: AlgoliaClientWrapper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AlgoliaService, AlgoliaClientWrapper],
            imports: [
                ConfigModule.forRoot({
                    envFilePath: ['.env.dev.local', '.env'],
                }),
            ],
        }).compile();

        service = module.get<AlgoliaService>(AlgoliaService);
        algoliaClient = module.get<AlgoliaClientWrapper>(AlgoliaClientWrapper);
    });

    const errorMessage = 'Something went wrong here ...';

    function setupSpyAndThrow(algoliaClient: AlgoliaClientWrapper) {
        jest.spyOn(algoliaClient, 'getIndex').mockImplementation(() => {
            throw new Error(errorMessage);
        });
    }

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should send update movie to algolia service', async () => {
        jest.spyOn(algoliaClient, 'getIndex').mockImplementation(() => {
            return {
                partialUpdateObject: (object: Record<string, any>) =>
                    Promise.resolve({
                        objectID: object.objectID,
                        taskID: 123,
                    }),
            } as any;
        });

        expect(await service.updateMovie('42', {} as UpdateMovieDto)).toEqual({
            objectID: '42',
            taskID: 123,
        });
    });

    it('should send create movie to algolia service', async () => {
        jest.spyOn(algoliaClient, 'getIndex').mockImplementation(() => {
            return {
                saveObject: (object: Record<string, any>) =>
                    Promise.resolve({
                        objectID: object.objectID,
                        taskID: 123,
                    }),
            } as any;
        });

        const result = await service.createNewMovie({} as MovieDto);
        expect(result.objectID).toBeDefined();
    });

    it('should wrap error to the user when creating new movie', async () => {
        setupSpyAndThrow(algoliaClient);
        await expect(async () => await service.createNewMovie({} as MovieDto)).rejects.toThrowError(
            new Error('Unable to create movie. Please contact YAMA Administrator'),
        );
    });

    it('should wrap error to the user when updating movie', async () => {
        setupSpyAndThrow(algoliaClient);
        await expect(
            async () => await service.updateMovie('123', {} as UpdateMovieDto),
        ).rejects.toThrowError(new Error('Unable to update movie. Please contact YAMA Administrator'));
    });

    it('should wrap error to the user when deleting movie', async () => {
        setupSpyAndThrow(algoliaClient);
        await expect(async () => await service.deleteMovie('123')).rejects.toThrowError(
            new Error('Unable to delete movie. Please contact YAMA Administrator'),
        );
    });
});
