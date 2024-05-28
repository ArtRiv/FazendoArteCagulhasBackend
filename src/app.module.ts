import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule],
  controllers: [],
})
export class AppModule {}
