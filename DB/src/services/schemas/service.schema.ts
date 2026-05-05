import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop({
    required: true,
    type: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  })
  title: {
    en: string;
    ar: string;
  };

  @Prop({
    required: true,
    type: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  })
  summary: {
    en: string;
    ar: string;
  };

  @Prop({
    required: true,
    type: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  })
  content: {
    en: string;
    ar: string;
  };

  @Prop({ required: true })
  image: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
