import { Injectable } from '@nestjs/common';
import { Product } from '../../interfaces/product.interface';
import { PrismaService } from 'nestjs-prisma';
import { Review } from '../../interfaces/review.interface';
import { FilteredProductQueryParams } from 'src/interfaces/query_params.interface';
import { getSortByQueryConstraint } from 'src/utils/getSortByConstraint';
import { getAvarageRating } from 'src/utils/addAvarageRating';
import { getPagination } from 'src/utils/getPagination';

@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  async getFilteredProducts(
    params: FilteredProductQueryParams,
  ): Promise<Product[]> {
    const { skip, take } = getPagination(params.page);
    const { field, order } = getSortByQueryConstraint(params.sort_by);

    let products: Product[];
    if (params.category == 'ALL') {
      // In case there is no category to filter by
      products = await this.prisma.product.findMany({
        orderBy: {
          [field]: order,
        },
        take: Number(take),
        skip: Number(skip),
      });
    } else {
      // In case there is a category, for example /product/games
      products = await this.prisma.product.findMany({
        where: {
          category: params.category.toUpperCase(),
        },
        orderBy: {
          [field]: order,
        },
        take: Number(take),
        skip: Number(skip),
      });
    }

    const productsIDs = products.map((product) => product.id);
    const reviews: Partial<Review>[] = await this.prisma.review.findMany({
      where: {
        product_id: {
          in: productsIDs,
        },
      },
      select: {
        rating: true,
        product_id: true,
      },
    });

    const productsWithAvarageRating: Product[] = products.map((product) => {
      const productReviews = reviews.filter(
        (review) => review.product_id === product.id,
      );

      const rating = getAvarageRating(productReviews);

      return {
        ...product,
        rating,
      };
    });

    return productsWithAvarageRating;
  }
}
