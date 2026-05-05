import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area, AreaDocument } from './schema/area.schema';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private areaModel: Model<AreaDocument>) {}

  async create(createAreaDto: CreateAreaDto): Promise<any> {
    const createdArea = new this.areaModel(createAreaDto);
    createdArea.save();
    return { message: 'The Area has been created successfully' };
  }

  async findAll(): Promise<Area[]> {
    return this.areaModel.find().exec();
  }

  async findOne(id: string): Promise<Area> {
    const area = await this.areaModel.findById(id).exec();
    if (!area) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return area;
  }

  async update(id: string, updateAreaDto: UpdateAreaDto): Promise<any> {
    const updatedArea = await this.areaModel
      .findByIdAndUpdate(id, updateAreaDto, { new: true })
      .exec();

    if (!updatedArea) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return { meassage: 'Area Updated Successfully' };
  }

  async remove(id: string): Promise<any> {
    const deletedArea = await this.areaModel.findByIdAndDelete(id).exec();
    if (!deletedArea) {
      throw new NotFoundException(`Area with ID ${id} not found`);
    }
    return { meassage: 'Area Deleted Successfully' };
  }

  async findByName(areaName: string): Promise<Area[]> {
    const areas = await this.areaModel
      .find({
        area: { $regex: new RegExp(areaName, 'i') },
      })
      .exec();

    if (!areas.length) {
      throw new NotFoundException(`No areas found matching "${areaName}"`);
    }
    return areas;
  }
}
