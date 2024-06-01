import { Controller, Get, Query } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  async getFilteredProducts(
    @Query('search_query') searchQuery: string,
  ): Promise<Product[]> {
    const results = await this.resultsService.getProductsBySearch(searchQuery);

    return results;
  }
}
