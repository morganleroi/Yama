import { Injectable } from '@nestjs/common';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlgoliaClientWrapper {
  private client: SearchClient;
  private readonly index: SearchIndex;

  constructor(private configService: ConfigService) {
    this.client = algoliasearch(
      configService.get<string>('ALGOLIA_APP_ID'),
      configService.get<string>('ALGOLIA_SECRET_KEY'),
    );
    this.index = this.client.initIndex('Movies');
  }

  getIndex(): SearchIndex {
    return this.index;
  }
}
