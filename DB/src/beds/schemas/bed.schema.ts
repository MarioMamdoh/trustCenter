import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BedDocument = Bed & Document;

@Schema()
export class Bed {
  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  numberOfBed: number;

  @Prop({ default: false })
  isReserved: boolean;
}

export const BedSchema = SchemaFactory.createForClass(Bed);
