import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ResultsProductQueryParams } from 'src/interfaces/query_params.interface';
import { getPagination } from 'src/utils/getPagination';
import { getSortByQueryConstraint } from 'src/utils/getSortByConstraint';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductsBySearch(params: ResultsProductQueryParams) {
    const { skip, take } = getPagination(params.page);
    const { field, order } = getSortByQueryConstraint(params.sort_by);

    const results = await this.prisma.product.findMany({
      where: {
        tag: { search: params.search_query },
      },
      orderBy: {
        [field]: order,
      },
      take: take,
      skip: skip,
    });

    return results;
  }
}
