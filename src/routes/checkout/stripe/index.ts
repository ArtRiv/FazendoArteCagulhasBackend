import Stripe from "stripe";
import { config } from "./config";
import { CheckoutParams } from "src/interfaces/checkout.interface";
import { getLineItems } from "../utils/get-line-items";
import { getStripeCheckoutShippingOptionsFormat } from "../utils/get-shipping-options";

export const stripe = new Stripe(config.stripe.secretKey, {
    apiVersion: '2024-06-20'
})

export const createCheckoutSession = async ({ items, shippingOptions, userID }: CheckoutParams) => {
    try {
        const line_items = await getLineItems({ items, stripe });
        const shipping_options = getStripeCheckoutShippingOptionsFormat(shippingOptions);

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ["card"],
            ui_mode: "embedded",
            line_items,
            shipping_options,
            client_reference_id: userID,
            redirect_on_completion: "always",
            return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`
        })

        return session;

    } catch (error) {
        console.error(error);
    }
}