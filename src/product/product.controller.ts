import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product.interface';
import { SortByTypes } from 'src/types/product_sort_by';
import { ProductCategoriesTypes } from 'src/types/product_category';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post()
  // async createProduct(
  //   @Body() createProduct: CreateProductDto,
  // ): Promise<Product> {
  //   return this.productService.createProduct(createProduct);
  // }

  @Post()
  async createProducts(@Body() products: Product[]): Promise<Product[]> {
    return this.productService.createProduct(products);
  }

  @Get('/:category')
  async getFilteredProducts(
    @Param('category') category: ProductCategoriesTypes,
    @Query('page') page: number = 1,
    @Query('sort_by')
    sort_by: SortByTypes = 'BEST_SELLING',
  ): Promise<Product[]> {
    console.log(category);
    const products = await this.productService.getFilteredProducts({
      page,
      category,
      sort_by,
    });

    return products;
  }

  // @Delete()
  // async deleteProduct(@Body() id: string): Promise<Product> {
  //   return this.productService.deleteProduct(id);
  // }
}
