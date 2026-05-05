import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial, TestimonialDocument } from './schemas/testimonial.schema';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private testimonialModel: Model<TestimonialDocument>,
  ) {}

  async create(createTestimonialDto: CreateTestimonialDto): Promise<string> {
    const createdTestimonial = new this.testimonialModel(createTestimonialDto);
    await createdTestimonial.save();
    return 'The Testimonial has been created successfully';
  }

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialModel.find({}, { __v: false }).exec();
  }

  async findOne(id: string): Promise<Testimonial> {
    return this.testimonialModel.findById(id, { __v: false }).exec();
  }

  async update(
    id: string,
    updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<string> {
    await this.testimonialModel
      .findByIdAndUpdate(id, updateTestimonialDto, { new: true })
      .exec();
    return 'The Testimonial has been updated successfully';
  }

  async remove(id: string): Promise<string> {
    await this.testimonialModel.findByIdAndDelete(id).exec();
    return 'The Testimonial has been deleted successfully';
  }
}
