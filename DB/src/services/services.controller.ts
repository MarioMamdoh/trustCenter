import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const createdService = await this.servicesService.create(createServiceDto);
    return {
      statusCode: 201,
      message: 'Service created successfully',
      data: createdService,
    };
  }

  @Get()
  findAll(@Query('lang') lang: string = 'en') {
    return this.servicesService.findAll(lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('lang') lang: string = 'en') {
    return this.servicesService.findOne(id, lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    try {
      const result = await this.servicesService.uploadFile(file, id);
      return { message: 'File uploaded successfully', result };
    } catch (error) {
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }

  @Delete('file/:id')
  async deleteFile(@Param('id') id: string) {
    return await this.servicesService.deleteFile(id);
  }

  @Patch('file/:fileId/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('fileId') fileId: string,
    @Param('id') id: string,
  ) {
    return await this.servicesService.updateFile(file, fileId, id);
  }
}
