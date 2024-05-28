import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { Product } from './interfaces/product.interface';
import { PrismaService } from 'nestjs-prisma';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = {
      ...createProductDto,
      id: uuidv4(),
    };

    return this.prisma.product.create({
      data: product,
    });
  }

  async getAllProduct(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id: id },
    });
  }
}
