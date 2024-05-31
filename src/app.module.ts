import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule, ReviewModule],
  controllers: [],
})
export class AppModule {}
