import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateBedDto {
  @IsNotEmpty()
  @IsString()
  area: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfBed: number;

  @IsOptional()
  @IsBoolean()
  isReserved?: boolean;
}
