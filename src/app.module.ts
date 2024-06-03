import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './routes/product/product.module';
import { ReviewModule } from './routes/review/review.module';
import { ResultsModule } from './routes/results/results.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule, ReviewModule, ResultsModule],
  controllers: [],
})
export class AppModule {}
