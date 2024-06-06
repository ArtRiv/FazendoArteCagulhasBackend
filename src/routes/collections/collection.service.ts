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

  async createProducts(product: Product[]): Promise<Product[]> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.product.createMany({
          data: product,
        });
      });
      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getFilteredProducts(
    params: FilteredProductQueryParams,
  ): Promise<Product[]> {
    const { skip, take } = getPagination(params.page);
    const { field, order } = getSortByQueryConstraint(params.sort_by);

    let products: Product[];

    const query = {
      orderBy: {
        [field]: order,
      },
      take: Number(take),
      skip: Number(skip),
      where: {},
    };

    if (params.category_id == 1) {
      // In case there is no category to filter by
      products = await this.prisma.product.findMany(query);
    } else {
      // In case there is a category, for example id = 4 (games)
      query.where = {
        category_id: Number(params.category_id),
      };
      products = await this.prisma.product.findMany(query);
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

  async deleteProducts() {
    await this.prisma.product.deleteMany();
  }
}
