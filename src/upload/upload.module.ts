import { MulterModule } from '@nestjs/platform-express';
import { Food } from './upload.entity';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UploadRepository } from './upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";

@Module({
    imports : [
        MulterModule,
        TypeOrmModule.forFeature([UploadRepository,Food]),
    ],
    controllers:[UploadController],
    providers:[UploadService],
})
export class UploadModule {}