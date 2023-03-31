// upload.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  foodName: string;

  @Column({ nullable: true })
  mealTime: string;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  text: string;
}