import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

export enum UserRole {
  TEAM_USER = 'teamUser',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}
export enum EmployeeDepartment {
  NURSING = 'nursing',
  MEDICAL = 'medical',
  FINANCE = 'finance',
  DOCTOR = 'doctor',
  ADMINISTRATION = 'administration',
  MANAGER = 'manager',
  RECEPTION = 'reception',
  IT = 'it',
  CUSTOMER_SERVICE = 'customerService',
  SALES = 'sales',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, enum: EmployeeDepartment })
  department: EmployeeDepartment;

  @Prop()
  salaryPerDay: number;

  @Prop({ default: 0 })
  deduction: number;

  @Prop()
  totalSalary: number;
}

const UserSchema = SchemaFactory.createForClass(User);

// Add comparePassword method to the schema
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Pre-save middleware
UserSchema.pre('save', async function (next) {
  // Hash password if it's modified
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  this.salaryPerDay = this.salary / 30;
  this.totalSalary = this.salary - this.deduction;
  next();
});

// Pre-update middleware
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as any;

  // Hash password if it's being updated
  if (update.password) {
    const saltRounds = 10;
    update.password = await bcrypt.hash(update.password, saltRounds);
  }
  next();
});

export { UserSchema };
