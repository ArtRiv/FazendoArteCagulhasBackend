import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './routes/review/review.module';
import { ResultsModule } from './routes/results/results.module';
import { CollectionModule } from './routes/collections/collection.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CollectionModule,
    ReviewModule,
    ResultsModule,
  ],
  controllers: [],
})
export class AppModule {}
