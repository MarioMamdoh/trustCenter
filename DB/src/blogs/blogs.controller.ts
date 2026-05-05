import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ErrorInterceptor } from '../common/interceptors/error.interceptor';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/blogs')
@UseInterceptors(ErrorInterceptor)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    const createdBlog = await this.blogsService.create(createBlogDto);
    return {
      statusCode: 201,
      message: 'Blog created successfully',
      data: createdBlog,
    };
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('lang') lang: string = 'en',
  ) {
    return this.blogsService.findAll(limit, page, lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('lang') lang: string = 'en') {
    return this.blogsService.findOne(id, lang);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }

  @Patch(':id/views')
  incrementViews(@Param('id') id: string) {
    return this.blogsService.incrementViews(id);
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
      const result = await this.blogsService.uploadFile(file, id);
      return { message: 'File uploaded successfully', result };
    } catch (error) {
      throw new BadRequestException(`Failed to upload file: ${error.message}`);
    }
  }

  @Delete('file/:id')
  async deleteFile(@Param('id') id: string) {
    return await this.blogsService.deleteFile(id);
  }

  @Patch('file/:fileId/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('fileId') fileId: string,
    @Param('id') id: string,
  ) {
    return await this.blogsService.updateFile(file, fileId, id);
  }
}
