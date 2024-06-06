import { Controller, Get } from '@nestjs/common';
import { Category } from 'src/interfaces/category.interface';
import { CategoryService } from './category.service';

@Controller('category')
export class CollectionController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryService.getCategories();

    return categories;
  }
}
