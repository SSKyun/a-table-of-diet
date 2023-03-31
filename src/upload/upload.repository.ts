import { CreateUploadDto } from './dto/create-upload.dto';
import { Food } from './upload.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadRepository extends Repository<Food> {
  async createUpload(createUploadDto: CreateUploadDto): Promise<Food> {
    const { date, foodName, mealTime, filename, originalname, text } = createUploadDto;

    const upload = this.create({
      date,
      foodName,
      mealTime,
      filename,
      originalname,
      text,
    });

    await this.save(upload);

    return upload;
  }
}