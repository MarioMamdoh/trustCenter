import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { ErrorInterceptor } from '../common/interceptors/error.interceptor';

import { AchievementType } from './schemas/achievement.schema';
import { log } from 'console';

@Controller('api/achievements')
@UseInterceptors(ErrorInterceptor)
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementsService.create(createAchievementDto);
  }

  @Get()
  findAll() {
    return this.achievementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achievementsService.findOne(id);
  }

  @Patch(':type')
  update(@Param('type') type: AchievementType, @Body('count') count: number) {
    return this.achievementsService.update(type, count);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(id);
  }
  @Patch('increment/:type')
  incrementAchievement(@Param('type') type: AchievementType) {
    return this.achievementsService.incrementAchievement(type);
  }
  @Patch('decrement/:type')
  decrementAchievement(@Param('type') type: AchievementType) {
    return this.achievementsService.decrementAchievement(type);
  }
}
