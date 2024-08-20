import { CheckoutParams, ProductCart } from "src/interfaces/checkout.interface";
import { getPrices } from "./get-price";
import Stripe from "stripe";

interface getLineItems {
    stripe: Stripe,
    items: ProductCart[],
}

export const getLineItems = async ({ items, stripe } : getLineItems) => {
    const line_items = await Promise.all(items.map(async (item) => ({
        price: await getPrices(item.id, stripe),
        quantity: item.quantity,
    })));

    return line_items;
}