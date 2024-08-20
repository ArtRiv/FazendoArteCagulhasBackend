import { PartialShippingOption } from "src/routes/calculate-shipping/interface/shipping_option.interface";
import Stripe from "stripe";

export function getStripeCheckoutShippingOptionsFormat(
    shippingOptions: PartialShippingOption[],
    currency: string = "brl"
): Stripe.Checkout.SessionCreateParams.ShippingOption[] {
    return shippingOptions.map(option => ({
        shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
                amount: option.price * 100, // Convert price to cents
                currency: currency,
            },
            display_name: option.name,
            delivery_estimate: {
                minimum: {
                    unit: "business_day" as Stripe.Checkout.SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate.Minimum.Unit, // Use Stripe's enum
                    value: option.delivery_range.min,
                },
                maximum: {
                    unit: "business_day" as Stripe.Checkout.SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate.Maximum.Unit, // Use Stripe's enum
                    value: option.delivery_range.max,
                },
            },
        },
    }));
}