import { PartialType } from '@nestjs/mapped-types';
import { CreateBedDetailDto } from './create-bed-detail.dto';

export class UpdateBedDetailDto extends PartialType(CreateBedDetailDto) {}
