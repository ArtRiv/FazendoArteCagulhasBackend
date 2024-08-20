import Stripe from "stripe";

export const getPrices = async (productID: string, stripe: Stripe) => {
    const prices = await stripe.prices.list({
        product: productID,
    });
    const price = prices.data[0];

    return price.id;
}