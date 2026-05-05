import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Client, ID, InputFile, Storage } from 'node-appwrite';
import * as sdk from 'node-appwrite';

@Injectable()
export class ServicesService {
  private client: Client;
  private storage: Storage;
  private endpoint: string;
  private projectId: string;
  private bucketId: string;
  private readonly supportedLanguages = ['en', 'ar'];

  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {
    this.endpoint = 'https://cloud.appwrite.io/v1'; // Your Appwrite endpoint
    this.projectId = '67c4d522003d9c301365'; // Your Appwrite Project ID
    this.bucketId = '67c4d6e60016be9e1433'; // Your Appwrite Bucket ID

    this.client = new sdk.Client()
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('67c4d522003d9c301365')
      .setKey(
        'standard_1d26c01787ba383e78bc826d9c9f5124c74c2a7e111b75852a6c890e99310b42226f9c18c1238cf94482542cb9bfbc0d45de7bc4c268b05fb87d92b4687cf48f7f501de72793c2a20e570af34083f5ed57eee66557e7f3aa3c3e90d4b7866c3fb385e85885d6f969fefcc26476dbebce41c09a168bb0c7fce525f7759494a7bd',
      );
    this.storage = new sdk.Storage(this.client);
  }

  private validateLanguage(lang: string): string {
    const language = lang.toLowerCase();
    if (!this.supportedLanguages.includes(language)) {
      throw new BadRequestException(
        `Unsupported language: ${lang}. Supported languages: ${this.supportedLanguages.join(', ')}`,
      );
    }
    return language;
  }

  async create(createServiceDto: CreateServiceDto): Promise<any> {
    const createdService = new this.serviceModel(createServiceDto);
    await createdService.save();
    return createdService;
  }

  async findAll(lang: string = 'en'): Promise<any[]> {
    const validatedLang = this.validateLanguage(lang);
    const services = await this.serviceModel.find({}, { __v: false }).exec();
    return services.map((service) =>
      this.transformToLanguage(service, validatedLang),
    );
  }

  async findOne(id: string, lang: string = 'en'): Promise<any> {
    const validatedLang = this.validateLanguage(lang);
    const service = await this.serviceModel.findById(id, { __v: false }).exec();
    if (!service) {
      return null;
    }
    return this.transformToLanguage(service, validatedLang);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<any> {
    const result = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
    return { massage: 'The Service has been updated successfully', result };
  }

  async remove(id: string): Promise<any> {
    await this.serviceModel.findByIdAndDelete(id).exec();
    return { massage: 'The Service has been deleted successfully' };
  }

  private transformToLanguage(service: any, lang: string): any {
    const transformed = {
      _id: service._id,
      title: service.title[lang],
      summary: service.summary[lang],
      content: service.content[lang],
      image: service.image,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    };
    return transformed;
  }

  async uploadFile(file: Express.Multer.File, id: string): Promise<any> {
    try {
      // Upload the file to Appwrite Storage
      const result = await this.storage.createFile(
        '67c4d6e60016be9e1433', // Your Appwrite Bucket ID
        ID.unique(), // Unique file ID
        InputFile.fromBuffer(file.buffer, file.originalname),
        ['read("any")'], // Public read permissions
      );
      const imageUrl = `${this.endpoint}/storage/buckets/${this.bucketId}/files/${result.$id}/view?project=${this.projectId}`;
      const serviceItem = await this.serviceModel.findById(id);
      await serviceItem.updateOne({ image: imageUrl });
      return { ...result, imageUrl };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
  async deleteFile(fileId: string): Promise<any> {
    await this.storage.deleteFile('67c4d6e60016be9e1433', fileId);
    return { massage: 'file deleted Successfully' };
  }
  async updateFile(
    file: Express.Multer.File,
    fileId: string,

    id: string,
  ): Promise<any> {
    await this.deleteFile(fileId);
    await this.uploadFile(file, id);
  }
}
