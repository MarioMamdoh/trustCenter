import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema()
export class Testimonial {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  nameNSocial: string;

  @Prop({ required: true })
  image: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
