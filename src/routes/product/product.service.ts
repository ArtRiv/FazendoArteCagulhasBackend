import { Injectable } from '@nestjs/common';
import { Product } from '../../interfaces/product.interface';
import { PrismaService } from 'nestjs-prisma';
import { Review } from '../../interfaces/review.interface';
import { getAvarageRating } from 'src/utils/addAvarageRating';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    const productReviews: Partial<Review>[] = await this.prisma.review.findMany(
      {
        where: {
          product_id: id,
        },
        select: {
          rating: true,
        },
      },
    );

    const rating = getAvarageRating(productReviews);

    return {
      ...product,
      rating,
    };
  }

  async getSimilarProducts(id: string): Promise<Product[]> {
    const productReference = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        product_group: true,
      },
    });

    const similarProducts = await this.prisma.product.findMany({
      where: {
        product_group: productReference.product_group,
        NOT: { id: id },
      },
      orderBy: {
        purchase_count: 'desc',
      },
      take: 16,
    });

    const similarProductsIDs = similarProducts.map((product) => product.id);
    const reviews: Partial<Review>[] = await this.prisma.review.findMany({
      where: {
        product_id: {
          in: similarProductsIDs,
        },
      },
      select: {
        rating: true,
        product_id: true,
      },
    });

    const similarProductsWithAvarageRating: Product[] = similarProducts.map(
      (product) => {
        const productReviews = reviews.filter(
          (review) => review.product_id === product.id,
        );

        const rating = getAvarageRating(productReviews);

        return {
          ...product,
          rating,
        };
      },
    );

    return similarProductsWithAvarageRating;
  }

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

  // async deleteProduct(id: string): Promise<Product> {
  //   return this.prisma.product.delete({
  //     where: id,
  //   });
  // }
}
