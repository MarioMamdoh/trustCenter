import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesModule } from './services/services.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { AchievementsModule } from './achievements/achievements.module';
import { BlogsModule } from './blogs/blogs.module';
import { UsersModule } from './users/users.module';
import { BedsModule } from './beds/beds.module';
import { CustomersModule } from './customers/customers.module';
import { BedDetailsModule } from './bed-details/bed-details.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AreaModule } from './area/area.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ??
          configService.getOrThrow<string>('MONGO_DB'),
      }),
    }),
    ServicesModule,
    TestimonialsModule,
    AchievementsModule,
    BlogsModule,
    UsersModule,
    BedsModule,
    CustomersModule,
    BedDetailsModule,
    AreaModule,
    OffersModule,
  ],
})
export class AppModule {}
