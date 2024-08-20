import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Review } from 'src/interfaces/review.interface';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(reviews: Review[]): Promise<Review[]> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.review.createMany({
          data: reviews,
        });
      });
      return reviews;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteReview() {
    await this.prisma.review.deleteMany();
  }

  async getProductReviews(id: string): Promise<Review[]> {
    return await this.prisma.review.findMany({
      where: {
        product_id: id,
      },
    });
  }

  async getAllReviews(): Promise<Review[]> {
    return await this.prisma.review.findMany();
  }
}
