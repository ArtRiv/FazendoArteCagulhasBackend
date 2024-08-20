import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IShippingService } from './interface';

@Controller('shipping')
export class ShippingController {
  constructor(
    @Inject('IShippingService') private readonly shippingService: IShippingService
  ) {}

  @Get('/calculate/:zipCode')
  async calculateShipping(
    @Param('zipCode') zipCode: string,
  ) {
    return this.shippingService.calculateShipping(zipCode);
  }
}
