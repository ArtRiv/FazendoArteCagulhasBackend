import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './routes/review/review.module';
import { ResultsModule } from './routes/results/results.module';
import { CollectionModule } from './routes/collections/collection.module';
import { ProductModule } from './routes/product/product.module';
import { CategoryModule } from './routes/category/category.module';
import { UserModule } from './routes/user/user.module';
import { CheckoutModule } from './routes/checkout/checkout.module';
import { ShippingModule } from './routes/calculate-shipping/shipping.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CollectionModule,
    ProductModule,
    ReviewModule,
    ResultsModule,
    CategoryModule,
    UserModule,
    CheckoutModule,
    ShippingModule,
  ],
  controllers: [],
})
export class AppModule {}
