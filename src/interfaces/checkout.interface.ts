import { PartialShippingOption, ShippingOption } from "../routes/calculate-shipping/interface/shipping_option.interface";

export interface ProductCart {
    title: string,
    id: string,
    image: string,
    price: number,
    quantity: number,
    purchase_count: number,
    rating: number,
}

export interface CheckoutParams {
    items: ProductCart[],
    shippingOptions: ShippingOption[], 
    userID: string,
}