import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Category } from 'src/interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
}
