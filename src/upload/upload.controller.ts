import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createWorker } from 'tesseract.js';
import { UploadService } from './upload.service';
import { Food } from './upload.entity';
import { CreateUploadDto } from '../upload/dto/create-upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ message: string }> {
    if (!file) {
      throw new Error('이미지 파일을 업로드해주세요.');
    }

    const worker = createWorker({
      logger: m => console.log(m)
    });

    await (await worker).load();
    await (await worker).loadLanguage('eng');
    await (await worker).initialize('eng');
    const { data: { text } } = await (await worker).recognize(`./uploads/${file.filename}`);
    await (await worker).terminate();

    // Extracting foodName and mealTime from the OCR result
    const mealTimes = ['아침', '점심', '저녁'];
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const [foodName, mealTime] = lines.reduce((acc, line) => {
      const word = line.trim();
      if (mealTimes.includes(word)) {
        acc[1] = word;
      } else {
        acc[0] += ` ${word}`;
      }
      return acc;
    }, ['', '']);

    const uploadDto = new CreateUploadDto();
    uploadDto.filename = file.filename;
    uploadDto.originalname = file.originalname;
    uploadDto.text = text;
    uploadDto.foodName = foodName;
    uploadDto.mealTime = mealTime;
    uploadDto.date = new Date();

    await this.uploadService.createUpload(uploadDto);

    return { message: '이미지 파일 업로드가 완료되었습니다.' };
  }
}