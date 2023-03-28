import { CreateUploadDto } from './dto/create-upload.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadEntity } from './upload.entity';
import { UploadRepository } from './upload.repository';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadRepository)
    private readonly uploadRepository: UploadRepository,
  ) {}
  createUpload(createUploadDto:CreateUploadDto): Promise<UploadEntity> {
    return this.uploadRepository.createUpload(createUploadDto);
  }
}