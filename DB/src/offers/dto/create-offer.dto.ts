import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OfferNameDto {
  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ar: string;
}

export class OfferContentDto {
  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ar: string;
}

export class CreateOfferDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => OfferNameDto)
  offerName: OfferNameDto;

  @IsNotEmpty()
  @IsNumber()
  percentageOfOffer: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => OfferContentDto)
  contentOfOffer: OfferContentDto;

  @IsNotEmpty()
  @IsString()
  startOfferDate: string;

  @IsNotEmpty()
  @IsString()
  endOfferDate: string;
}
