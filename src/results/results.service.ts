import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductsBySearch(searchQuery: string) {
    const results = await this.prisma.product.findMany({
      where: {
        tag: { search: searchQuery },
      },
      take: 4,
    });

    console.log(results);
    return results;
  }
}
