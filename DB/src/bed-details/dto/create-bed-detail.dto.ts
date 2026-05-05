import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

export class CreateBedDetailDto {
  @IsNotEmpty()
  @IsMongoId()
  bedInfo: string;

  @IsNotEmpty()
  @IsMongoId()
  customerInfo: string;

  @IsNotEmpty()
  @IsNumber()
  paid: number;
}