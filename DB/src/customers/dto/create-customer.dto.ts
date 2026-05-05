import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsString()
  additional?: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  area: string;

}
