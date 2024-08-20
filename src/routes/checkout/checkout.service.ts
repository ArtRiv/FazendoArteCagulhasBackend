import { Injectable } from '@nestjs/common';
import { CheckoutParams } from 'src/interfaces/checkout.interface';
import { createCheckoutSession } from './stripe';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {

  async generateCheckoutSession(checkoutParams: CheckoutParams): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    try {
      const checkout = createCheckoutSession(checkoutParams)
      return checkout;
    } catch (error) {
      console.error(error);
    }
  }
}
