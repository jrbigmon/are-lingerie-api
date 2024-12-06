import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bag' })
export class BagModel {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column()
  description: string;

  @Column({ name: 'date_of_receipt' })
  dateOfReceipt: Date;

  @Column({ name: 'delivery_date' })
  deliveryDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
