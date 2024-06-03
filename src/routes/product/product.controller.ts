import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../../interfaces/product.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);

    return product;
  }

  @Get('/:id/similar')
  async getSimilarProducts(@Param('id') id: string): Promise<Product[]> {
    const similarProducts = await this.productService.getSimilarProducts(id);

    return similarProducts;
  }
}
