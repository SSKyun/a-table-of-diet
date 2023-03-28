import { UploadEntity } from './upload.entity';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UploadRepository } from './upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";

@Module({
    imports : [
        TypeOrmModule.forFeature([UploadRepository,UploadEntity]),
    ],
    controllers:[UploadController],
    providers:[UploadService,UploadRepository],
})
export class UploadModule {}