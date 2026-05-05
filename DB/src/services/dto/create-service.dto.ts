import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MultilingualContentDto {
  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ar: string;
}

export class CreateServiceDto {
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
}
