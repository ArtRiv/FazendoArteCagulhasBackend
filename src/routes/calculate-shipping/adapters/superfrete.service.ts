import { Injectable } from '@nestjs/common';
import { IShippingService } from '../interface';
import { PartialShippingOption, ShippingOption } from '../interface/shipping_option.interface';

@Injectable()
export class SuperFreteService implements IShippingService {
    private readonly apiURL = 'https://sandbox.superfrete.com/api/v0/calculator';
    private readonly fromPostalCode = '88025500';
    private readonly services = '1,2,17';

    async calculateShipping(zipCode: string): Promise<PartialShippingOption[]> {
        try {
            const response = await this.callSuperFreteAPI(zipCode);
            return this.mapResponseToPartialShippingOptions(response);
        } catch (error) {
            console.error('Error fetching shipping options', error);
            throw new Error('Error');
        }
    }

    private async callSuperFreteAPI(zipCode: string): Promise<ShippingOption[]> {
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.SUPERFRETE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: {
                    postal_code: this.fromPostalCode,
                },
                to: {
                    postal_code: zipCode,
                },
                services: this.services,
                options: {
                    own_hand: false,
                    receipt: false,
                    insurance_value: 0,
                    use_insurance_value: false,
                },
                package: {
                    height: 10,
                    width: 24,
                    length: 15,
                    weight: 0.2,
                },
            }),
        };

        const response = await fetch(this.apiURL, options);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        return response.json();
    }

    private mapResponseToPartialShippingOptions(shippingOptions: ShippingOption[]): PartialShippingOption[] {
        return shippingOptions.map((shippingOption: ShippingOption) => ({
            name: shippingOption.name,
            price: shippingOption.price,
            delivery_range: {
                min: shippingOption.delivery_range.min,
                max: shippingOption.delivery_range.max,
            }
        }));
    }
}

