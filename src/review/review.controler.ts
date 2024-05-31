import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get()
  async getAllReview(): Promise<Review[]> {
    return this.ReviewService.getAllReview();
  }

  // @Delete()
  // async deleteReview(@Body() id: string): Promise<Review> {
  //   return this.ReviewService.deleteReview(id);
  // }
}
