import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bed, BedDocument } from './schemas/bed.schema';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';

@Injectable()
export class BedsService {
  constructor(@InjectModel(Bed.name) private bedModel: Model<BedDocument>) {}

  async create(createBedDto: CreateBedDto): Promise<any> {
    const createdBed = new this.bedModel(createBedDto);
    await createdBed.save();
    return { message: 'The Bed has been created successfully' };
  }

  async findAll(): Promise<Bed[]> {
    return this.bedModel.find({}, { __v: false }).exec();
  }

  async findOne(id: string): Promise<Bed> {
    const bed = await this.bedModel.findById(id, { __v: false }).exec();
    if (!bed) {
      throw new NotFoundException(`Bed with ID ${id} not found`);
    }
    return bed;
  }

  async update(id: string, updateBedDto: UpdateBedDto): Promise<any> {
    const updatedBed = await this.bedModel
      .findByIdAndUpdate(id, updateBedDto, { new: true })
      .exec();
    if (!updatedBed) {
      throw new NotFoundException(`Bed with ID ${id} not found`);
    }
    return { message: 'The Bed has been updated successfully' };
  }

  async remove(id: string): Promise<any> {
    const deletedBed = await this.bedModel.findByIdAndDelete(id).exec();
    if (!deletedBed) {
      throw new NotFoundException(`Bed with ID ${id} not found`);
    }
    return { message: 'The Bed has been deleted successfully' };
  }

  async updateReservationStatus(id: string, isReserved: boolean): Promise<any> {
    const bed = await this.bedModel
      .findByIdAndUpdate(id, { isReserved }, { new: true })
      .exec();
    if (!bed) {
      throw new NotFoundException(`Bed with ID ${id} not found`);
    }
    return { message: 'The Bed has been updated successfully' };
  }

  async findAvailableBeds(): Promise<Bed[]> {
    return this.bedModel.find({ isReserved: false }, { __v: false }).exec();
  }

  async findBedsByAreaAndStatus(
    area: string,
    isReserved?: boolean,
  ): Promise<Bed[]> {
    const query: any = { area };
    if (isReserved !== undefined) {
      query.isReserved = isReserved;
    }
    return this.bedModel.find(query, { __v: false }).exec();
  }
}
