import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  IsEmail,
  MinLength,
} from 'class-validator';
import { EmployeeDepartment, UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsEnum(EmployeeDepartment)
  department: EmployeeDepartment;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(16)
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  salary: number;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  duration: number;

  @IsNumber()
  @Min(0)
  deduction?: number;
}
