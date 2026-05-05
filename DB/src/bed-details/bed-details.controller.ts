import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { BedDetailsService } from './bed-details.service';
import { CreateBedDetailDto } from './dto/create-bed-detail.dto';
import { ErrorInterceptor } from '../common/interceptors/error.interceptor';

@Controller('api/bed-details')
@UseInterceptors(ErrorInterceptor)
export class BedDetailsController {
  constructor(private readonly bedDetailsService: BedDetailsService) {}

  @Post()
  create(@Body() createBedDetailDto: CreateBedDetailDto) {
    return this.bedDetailsService.create(createBedDetailDto);
  }

  @Get()
  findAll(
    @Query('customer') customerId?: string,
    @Query('bed') bedId?: string,
  ) {
    if (customerId) {
      return this.bedDetailsService.findByCustomer(customerId);
    }
    if (bedId) {
      return this.bedDetailsService.findByBed(bedId);
    }
    return this.bedDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedDetailsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bedDetailsService.remove(id);
  }
}
