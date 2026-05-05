import { IsNotEmpty, IsEnum } from 'class-validator';
import { AchievementType } from '../schemas/achievement.schema';

export class CreateAchievementDto {
  @IsNotEmpty()
  @IsEnum(AchievementType)
  type: AchievementType;

  count: number;
}
