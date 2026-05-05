import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AchievementDocument = Achievement & Document;

export enum AchievementType {
  SERVED = 'served',
  TEAM = 'team',
  EXPERIENCE = 'experience',
  AMBULANCE = 'ambulance',
}

@Schema()
export class Achievement {
  @Prop({ required: true, enum: AchievementType })
  type: AchievementType;

  @Prop({ default: 0 })
  count: number;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
