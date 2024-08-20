import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutParams } from 'src/interfaces/checkout.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async generateCheckoutSession(@Body() checkoutParams: CheckoutParams): Promise<{url: string}> {
    return this.checkoutService.generateCheckoutSession(checkoutParams);
  }
}
