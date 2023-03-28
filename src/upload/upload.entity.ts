import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UploadEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    originalname: string;
  
    @Column()
    filename: string;
  
    @Column()
    text: string;
}