import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    await createdCustomer.save();
    return { message: 'The Customer has been created successfully' };
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find({}, { __v: false }).exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel
      .findById(id, { __v: false })
      .exec();
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<any> {
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(id, updateCustomerDto, { new: true })
      .exec();

    if (!updatedCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return { message: 'The Customer has been updated successfully' };
  }

  async remove(id: string): Promise<any> {
    const deletedCustomer = await this.customerModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return { message: 'The Customer has been deleted successfully' };
  }

  async search(query: string): Promise<Customer[]> {
    return this.customerModel
      .find({
        $or: [{ fullName: { $regex: query, $options: 'i' } }],
      })
      .exec();
  }
}
