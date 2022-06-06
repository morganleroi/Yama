import { Test, TestingModule } from '@nestjs/testing';
import { AlgoliaService } from './algolia.service';
import {ConfigModule} from "@nestjs/config";

describe('AlgoliaService', () => {
  let service: AlgoliaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlgoliaService],
      imports: [ConfigModule.forRoot({
        envFilePath: ['.env.dev.local', '.env'],
      })],
    }).compile();

    service = module.get<AlgoliaService>(AlgoliaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
