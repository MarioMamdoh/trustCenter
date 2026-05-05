import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { BedsService } from './beds.service';
import { CreateBedDto } from './dto/create-bed.dto';
import { ErrorInterceptor } from '../common/interceptors/error.interceptor';
import { UpdateBedDto } from './dto/update-bed.dto';

@Controller('api/beds')
@UseInterceptors(ErrorInterceptor)
export class BedsController {
  constructor(private readonly bedsService: BedsService) {}

  @Post()
  create(@Body() createBedDto: CreateBedDto) {
    return this.bedsService.create(createBedDto);
  }

  @Get()
  findAll() {
    return this.bedsService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.bedsService.findAvailableBeds();
  }

  @Get('area/:area')
  findByArea(
    @Param('area') area: string,
    @Query('isReserved') isReserved?: string,
  ) {
    const isReservedBoolean =
      isReserved === undefined ? undefined : isReserved === 'true';
    return this.bedsService.findBedsByAreaAndStatus(area, isReservedBoolean);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBedDto: UpdateBedDto) {
    return this.bedsService.update(id, updateBedDto);
  }

  @Patch(':id/reserve')
  reserve(@Param('id') id: string) {
    return this.bedsService.updateReservationStatus(id, true);
  }

  @Patch(':id/unreserve')
  unreserve(@Param('id') id: string) {
    return this.bedsService.updateReservationStatus(id, false);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bedsService.remove(id);
  }
}
