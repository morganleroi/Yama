import { Test, TestingModule } from '@nestjs/testing';
import { MoviesControllerV1 } from './moviesControllerV1';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesControllerV1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesControllerV1],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesControllerV1>(MoviesControllerV1);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
