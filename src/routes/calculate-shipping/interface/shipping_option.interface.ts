export interface ShippingOption {
    id: number,
    name: string,
    price: number,
    discount: string,
    currency: string,
    delivery_time: number,
    delivery_range: {
        min: number,
        max: number,
    },
    packages: Package[],
    additional_services: {
        receipt: boolean,
        own_hand: boolean,
    },
    company: {
        id: number,
        name: string,
        picture: string,
    },
    has_error: boolean
}

export type PartialShippingOption = Pick<ShippingOption, "name" | "price" | "delivery_range">;

interface Package {
    price: number,
    discount: string,
    format: string,
    dimension: {
        height: string,
        width: string,
        length: string,
    },
    weight: string,
    insurance_value: number,
}