import { PartialShippingOption } from "src/routes/calculate-shipping/interface/shipping_option.interface";

export interface IShippingService {
    calculateShipping( zipCode: string ): Promise<PartialShippingOption[]>;
}