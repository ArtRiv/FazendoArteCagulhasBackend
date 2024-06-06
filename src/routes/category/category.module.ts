import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { CollectionController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollectionController],
  providers: [CategoryService],
})
export class CategoryModule {}
