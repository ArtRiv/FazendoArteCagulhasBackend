import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProduct);
  }

  @Get()
  async getAllProduct(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }

  @Delete()
  async deleteProduct(@Body() id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
