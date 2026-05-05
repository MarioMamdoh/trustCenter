import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from './schemas/offer.schema';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const createdOffer = new this.offerModel(createOfferDto);
    return createdOffer.save();
  }

  async findAll(): Promise<Offer[]> {
    return this.offerModel.find().exec();
  }

  async findOne(id: string): Promise<Offer> {
    const offer = await this.offerModel.findById(id).exec();
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
    return offer;
  }

  async update(id: string, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    const updatedOffer = await this.offerModel.findByIdAndUpdate(id, updateOfferDto, { new: true }).exec();
    if (!updatedOffer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
    return updatedOffer;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedOffer = await this.offerModel.findByIdAndDelete(id).exec();
    if (!deletedOffer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
    return { message: 'The Offer has been deleted successfully' };
  }
}