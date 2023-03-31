import { CreateUploadDto } from './dto/create-upload.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './upload.entity';
import { UploadRepository } from './upload.repository';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadRepository)
    private uploadRepository: UploadRepository,
  ) {}
  createUpload(createUploadDto:CreateUploadDto): Promise<Food> {
    return this.uploadRepository.createUpload(createUploadDto);
  }
}