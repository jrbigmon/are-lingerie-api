import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export class Model {
  @PrimaryColumn({ nullable: false })
  id: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;
}
