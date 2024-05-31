import { Injectable } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { PrismaService } from 'nestjs-prisma';
import { Review } from '../interfaces/review.interface';
import { ProductQueryParams } from 'src/interfaces/query_params.interface';
import { getSortByQueryConstraint } from 'src/utils/getSortByConstraint';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // async createProduct(createProductDto: CreateProductDto): Promise<Product> {
  //   const product: Product = {
  //     ...createProductDto,
  //     id: uuidv4(),
  //   };

  //   return this.prisma.product.create({
  //     data: product,
  //   });
  // }

  async createProduct(products: Product[]): Promise<Product[]> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.product.createMany({
          data: products,
        });
      });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getFilteredProducts(params: ProductQueryParams): Promise<Product[]> {
    // Pagination logic
    const DEFAULT_TAKE = 16;
    const take = DEFAULT_TAKE;
    const skip = (params.page - 1) * DEFAULT_TAKE;

    // Sort by constraint
    const { field, order } = getSortByQueryConstraint(params.sort_by);

    let products: Product[];
    if (params.category) {
      // In case there is a category, for example /product?category=games
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
    } else {
      // In case there is no category to filter by
      products = await this.prisma.product.findMany({
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
      const totalRating = productReviews.length;
      const sumRatings = productReviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      const avarageRating = totalRating > 0 ? sumRatings / totalRating : 0;
      const roundedRating = Math.round(avarageRating * 2) / 2; // Rounds to nearest 0.5

      return {
        ...product,
        rating: roundedRating,
      };
    });

    return productsWithAvarageRating;
  }

  // async deleteProduct(id: string): Promise<Product> {
  //   return this.prisma.product.delete({
  //     where: id,
  //   });
  // }
}
