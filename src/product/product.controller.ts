import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';

@Controller('product')
export class ProductController {

    @Post()
    async createProduct(@Body() createProduct: CreateProductDto) {
        return createProduct;
    }
}
