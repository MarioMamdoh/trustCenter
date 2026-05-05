import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MultilingualContentDto {
  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ar: string;
}

export class CreateBlogDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MultilingualContentDto)
  title: MultilingualContentDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MultilingualContentDto)
  summary: MultilingualContentDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MultilingualContentDto)
  content: MultilingualContentDto;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  views?: number;
}
