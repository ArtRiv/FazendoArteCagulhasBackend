import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './routes/review/review.module';
import { ResultsModule } from './routes/results/results.module';
import { CollectionModule } from './routes/collections/collection.module';
import { ProductModule } from './routes/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CollectionModule,
    ProductModule,
    ReviewModule,
    ResultsModule,
  ],
  controllers: [],
})
export class AppModule {}
