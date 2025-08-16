import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Voice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  type!: string;
}
