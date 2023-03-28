import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createWorker } from 'tesseract.js';
import { UploadService } from './upload.service';
import { UploadEntity } from './upload.entity';

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

    const worker = createWorker();
    await (await worker).load();
    await (await worker).loadLanguage('eng');
    await (await worker).initialize('eng');
    const { data: { text } } = await (await worker).recognize(`./uploads/${file.filename}`);
    await (await worker).terminate();

    const upload = new UploadEntity();
    upload.originalname = file.originalname;
    upload.filename = file.filename;
    upload.text = text;

    await this.uploadService.createUpload(upload);

    return { message: '이미지 파일 업로드가 완료되었습니다.' };
  }
}