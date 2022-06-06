import {Test, TestingModule} from '@nestjs/testing';
import {MoviesControllerV1} from './moviesControllerV1';
import {AlgoliaService} from '../algolia/algolia.service';
import {ConfigModule} from '@nestjs/config';
import {UpdateMovieDto} from './dto/update-movie.dto';
import {AlgoliaClientWrapper} from '../algolia/algoliaClientWrapper';

describe('MoviesController', () => {
    let controller: MoviesControllerV1;
    let algoliaService: AlgoliaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesControllerV1],
            providers: [AlgoliaService, AlgoliaClientWrapper],
            imports: [
                ConfigModule.forRoot({
                    envFilePath: ['.env.dev.local', '.env'],
                }),
            ],
        }).compile();

        controller = module.get<MoviesControllerV1>(MoviesControllerV1);
        algoliaService = module.get<AlgoliaService>(AlgoliaService);
    });

    it('should be defined', async () => {
        expect(controller).toBeDefined();
    });

    it('should send update movie to algolia service', async () => {
        jest
            .spyOn(algoliaService, 'updateMovie')
            .mockImplementation((objectID: string, movie: UpdateMovieDto) => {
                return Promise.resolve({
                    objectID,
                    taskId: 123,
                });
            });

        expect(await controller.update('42', {} as UpdateMovieDto)).toStrictEqual({
            objectID: '42',
            taskId: 123,
        });
    });
});
