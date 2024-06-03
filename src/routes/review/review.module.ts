import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ReviewController } from './review.controler';
import { ReviewService } from './review.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
