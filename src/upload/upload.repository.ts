import { CreateUploadDto } from './dto/create-upload.dto';
import { UploadEntity } from './upload.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadRepository extends Repository<UploadEntity>{
    constructor(private dataSource:DataSource){
        super(UploadEntity,dataSource.createEntityManager());
    }
    async createUpload(createUploadDto:CreateUploadDto):Promise<UploadEntity>{
        const {text,originalname,filename} = createUploadDto;
        const upload = this.create({
            text,
            originalname,
            filename
        });

        await this.save(upload);
        return upload;
    }
}