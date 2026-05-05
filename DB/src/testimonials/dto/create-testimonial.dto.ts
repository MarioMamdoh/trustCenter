import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  nameNSocial: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
