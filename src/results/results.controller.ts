import { Controller, Get, Query } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ResultsService } from './results.service';
import { SortByTypes } from 'src/types/product_sort_by';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  async getFilteredProducts(
    @Query('search_query') search_query: string,
    @Query('page') page: number = 1,
    @Query('sort_by') sort_by: SortByTypes = 'BEST_SELLING' as SortByTypes,
  ): Promise<Product[]> {
    const results = await this.resultsService.getProductsBySearch({
      search_query,
      page,
      sort_by,
    });

    return results;
  }
}
