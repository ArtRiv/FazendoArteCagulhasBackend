import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { SuperFreteService } from './adapters/superfrete.service';

@Module({
  controllers: [ShippingController],
  providers: [
    {
      provide: 'IShippingService',
      useClass: SuperFreteService,
    }
  ],
})
export class ShippingModule {}
