import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  prompt!: string;

  @Column()
  type!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
