import { IsNotEmpty } from "class-validator";

export class CreateUploadDto{
    @IsNotEmpty()
    text : string

    @IsNotEmpty()
    originalname: string;
  
    @IsNotEmpty()
    filename: string;
}