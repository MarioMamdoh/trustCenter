import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OfferDocument = Offer & Document;

export class OfferName {
  en: string;
  ar: string;
}

export class OfferContent {
  en: string;
  ar: string;
}

@Schema({ timestamps: true })
export class Offer {
  @Prop({ required: true, type: Object })
  offerName: OfferName;

  @Prop({ required: true })
  percentageOfOffer: number;

  @Prop({ required: true, type: Object })
  contentOfOffer: OfferContent;

  @Prop({ required: true })
  startOfferDate: string;

  @Prop({ required: true })
  endOfferDate: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
