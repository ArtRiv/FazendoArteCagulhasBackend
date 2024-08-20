import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';

@Controller('review')
export class ReviewController {
  constructor(private readonly ReviewService: ReviewService) {}

  @Post()
  async createReviews(@Body() Reviews: Review[]): Promise<Review[]> {
    return this.ReviewService.createReview(Reviews);
  }

  @Delete()
  async deleteReviews() {
    return this.ReviewService.deleteReview();
  }

  @Get()
  async getAllReviews(): Promise<Review[]> {
    return this.ReviewService.getAllReviews();
  }

  @Get('/:id')
  async getReviewByID(@Param('id') id: string): Promise<Review[]> {
    return this.ReviewService.getProductReviews(id);
  }

  // @Delete()
  // async deleteReview(@Body() id: string): Promise<Review> {
  //   return this.ReviewService.deleteReview(id);
  // }
}
