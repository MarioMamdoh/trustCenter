import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  _id: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  additional: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  area: string;
}

const CustomerSchema = SchemaFactory.createForClass(Customer);

// Pre-save middleware

export { CustomerSchema };
