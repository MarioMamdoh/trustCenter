import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Customer } from '../../customers/schemas/customer.schema';
import { Bed } from '../../beds/schemas/bed.schema';

export type BedDetailDocument = BedDetail & Document;

@Schema({ timestamps: true })
export class BedDetail {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Bed', required: true })
  bedInfo: Bed;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customerInfo: Customer;
  @Prop({ required: true })
  paid: number;
}

export const BedDetailSchema = SchemaFactory.createForClass(BedDetail);
