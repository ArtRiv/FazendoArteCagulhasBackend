import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule, ReviewModule, ResultsModule],
  controllers: [],
})
export class AppModule {}
