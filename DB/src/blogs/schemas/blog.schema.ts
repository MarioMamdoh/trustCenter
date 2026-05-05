import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
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

  @Prop({ default: 0 })
  views: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
