import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BedDetailsController } from './bed-details.controller';
import { BedDetailsService } from './bed-details.service';
import { BedDetail, BedDetailSchema } from './schemas/bed-detail.schema';
import { BedsModule } from '../beds/beds.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BedDetail.name, schema: BedDetailSchema },
    ]),
    BedsModule,
    CustomersModule,
  ],
  controllers: [BedDetailsController],
  providers: [BedDetailsService],
})
export class BedDetailsModule {}