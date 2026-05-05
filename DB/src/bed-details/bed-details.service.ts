import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BedDetail, BedDetailDocument } from './schemas/bed-detail.schema';
import { CreateBedDetailDto } from './dto/create-bed-detail.dto';
import { BedsService } from '../beds/beds.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class BedDetailsService {
  constructor(
    @InjectModel(BedDetail.name)
    private bedDetailModel: Model<BedDetailDocument>,
    private readonly bedsService: BedsService,
    private readonly customersService: CustomersService,
  ) {}

  async create(createBedDetailDto: CreateBedDetailDto): Promise<BedDetail> {
    // Verify bed exists and is available
    await this.bedsService.findOne(createBedDetailDto.bedInfo);

    // Verify customer exists
    await this.customersService.findOne(createBedDetailDto.customerInfo);

    // Create bed detail and mark bed as reserved
    const createdBedDetail = new this.bedDetailModel(createBedDetailDto);
    await this.bedsService.updateReservationStatus(
      createBedDetailDto.bedInfo,
      false,
    );

    return createdBedDetail.save();
  }

  async findAll(): Promise<BedDetail[]> {
    return this.bedDetailModel
      .find({}, { __v: false })
      .populate('bedInfo', { __v: false, isReserved: false })
      .populate('customerInfo', {
        __v: false,
        firstName: false,
        lastName: false,
        updatedAt: false,
      })
      .exec();
  }

  async findOne(id: string): Promise<BedDetail> {
    const bedDetail = await this.bedDetailModel
      .findById(id)
      .populate('bedInfo')
      .populate('customerInfo')
      .exec();

    if (!bedDetail) {
      throw new NotFoundException(`Bed detail with ID ${id} not found`);
    }
    return bedDetail;
  }

  async remove(id: string): Promise<BedDetail> {
    const bedDetail = await this.bedDetailModel.findById(id).exec();
    if (!bedDetail) {
      throw new NotFoundException(`Bed detail with ID ${id} not found`);
    }

    // Free up the bed
    await this.bedsService.updateReservationStatus(
      bedDetail.bedInfo.toString(),
      false,
    );

    return this.bedDetailModel.findByIdAndDelete(id).exec();
  }

  async findByCustomer(customerId: string): Promise<BedDetail[]> {
    return this.bedDetailModel
      .find({ customerInfo: customerId })
      .populate('bedInfo')
      .populate('customerInfo')
      .exec();
  }

  async findByBed(bedId: string): Promise<BedDetail[]> {
    return this.bedDetailModel
      .find({ bedInfo: bedId })
      .populate('bedInfo')
      .populate('customerInfo')
      .exec();
  }
}
