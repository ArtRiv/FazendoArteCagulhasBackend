import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Product } from '@prisma/client';
import { SortByTypes } from 'src/types/product_sort_by';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  // @Get()
  // async getAllProducts() {
  //   const products = await this.collectionService.getAllProducts();
  //   return products;
  // }

  @Get()
  async getFilteredProducts(
    @Query('category_id') category_id: number,
    @Query('page') page: number = 1,
    @Query('sort_by') sort_by: SortByTypes = 'BEST_SELLING' as SortByTypes,
  ): Promise<Product[]> {
    const products = await this.collectionService.getFilteredProducts({
      page,
      category_id,
      sort_by,
    });

    return products;
  }

  @Delete()
  async deleteProducts() {
    await this.collectionService.deleteProducts();
    return 'teste';
  }

  @Post()
  async createProducts(@Body() Products: Product[]): Promise<Product[]> {
    return this.collectionService.createProducts(Products);
  }
}
