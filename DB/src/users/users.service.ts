import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    // Check if user with email already exists
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return { message: 'The User has been created successfully' };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { __v: false, password: false }).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id, { __v: false, password: false })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    // If email is being updated, check if it's already taken
    if (updateUserDto.email) {
      const existingUser = await this.userModel
        .findOne({
          email: updateUserDto.email,
          _id: { $ne: id },
        })
        .exec();
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Get the current user to calculate salary-related fields
    const currentUser = await this.userModel.findById(id).exec();
    if (!currentUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Prepare the update object with proper typing
    const updateData: any = { ...updateUserDto };

    // Handle salary-related calculations
    if (updateData.salary !== undefined || updateData.deduction !== undefined) {
      const newSalary =
        updateData.salary !== undefined
          ? updateData.salary
          : currentUser.salary;
      const newDeduction =
        updateData.deduction !== undefined
          ? updateData.deduction
          : currentUser.deduction;

      // Calculate new values
      updateData.salaryPerDay = newSalary / 30;
      updateData.totalSalary = newSalary - newDeduction;
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'The User has been updated successfully' };
  }

  async remove(id: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'The User has been deleted successfully' };
  }

  async findByRole(role: string): Promise<User[]> {
    return this.userModel
      .find({ role }, { __v: false, password: false })
      .exec();
  }

  // Authentication methods
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.findByEmail(email);
      if (user) {
        const userDoc = user as any;
        if (typeof userDoc.comparePassword === 'function') {
          const isPasswordValid = await userDoc.comparePassword(password);
          if (isPasswordValid) {
            return user;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }
}
