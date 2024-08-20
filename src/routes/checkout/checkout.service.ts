import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CheckoutParams } from 'src/interfaces/checkout.interface';
import { createCheckoutSession } from 'src/stripe';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

  async generateCheckoutSession(checkoutParams: CheckoutParams): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    try {
      const checkout = createCheckoutSession(checkoutParams)
      return checkout;
    } catch (error) {
      console.error(error);
    }
  }
}
