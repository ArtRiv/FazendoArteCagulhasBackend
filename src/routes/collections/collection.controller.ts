import { Controller, Get, Param, Query } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductCategoriesTypes } from 'src/types/product_category';
import { SortByTypes } from 'src/types/product_sort_by';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get('/:category')
  async getFilteredProducts(
    @Param('category') category: ProductCategoriesTypes,
    @Query('page') page: number = 1,
    @Query('sort_by') sort_by: SortByTypes = 'BEST_SELLING' as SortByTypes,
  ): Promise<Product[]> {
    const products = await this.collectionService.getFilteredProducts({
      page,
      category,
      sort_by,
    });

    return products;
  }
}
