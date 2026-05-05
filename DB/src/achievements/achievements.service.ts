import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Achievement,
  AchievementDocument,
  AchievementType,
} from './schemas/achievement.schema';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
  ) {}

  async create(createAchievementDto: CreateAchievementDto): Promise<string> {
    const createdAchievement = new this.achievementModel(createAchievementDto);
    await createdAchievement.save();
    return 'The Achievement has been created successfully';
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementModel.find({}, { __v: false }).exec();
  }

  async findOne(id: string): Promise<Achievement> {
    const achievement = await this.achievementModel
      .findById(id, { __v: false })
      .exec();
    if (!achievement) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    return achievement;
  }

  async update(type: AchievementType, newCount: number): Promise<any> {
    const updatedAchievement = await this.achievementModel
      .findOneAndUpdate(
        { type: type },
        { $set: { count: newCount } },
        { upsert: true, new: true },
      )
      .exec();
    if (!updatedAchievement) {
      throw new NotFoundException(`Achievement with ID ${type} not found`);
    }
    return { message: 'The Achievement has been updated successfully' };
  }

  async remove(id: string): Promise<string> {
    const deletedAchievement = await this.achievementModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedAchievement) {
      throw new NotFoundException(`Achievement with ID ${id} not found`);
    }
    return 'The Achievement has been deleted successfully';
  }
  async incrementAchievement(type: AchievementType): Promise<any> {
    const achievement = await this.achievementModel
      .findOneAndUpdate(
        { type: type },
        { $inc: { count: 1 } },
        { upsert: true, new: true },
      )
      .exec();
    if (!achievement) {
      throw new NotFoundException(`Achievement with type ${type} not found`);
    }
    return achievement;
  }
  async decrementAchievement(type: AchievementType): Promise<any> {
    const achievement = await this.achievementModel
      .findOneAndUpdate(
        { type },
        { $inc: { count: -1 } },
        { upsert: true, new: true },
      )
      .exec();
    if (!achievement) {
      throw new NotFoundException(`Achievement with type ${type} not found`);
    }
    return achievement;
  }
}
