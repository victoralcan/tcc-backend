import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reserves')
class Reserve {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  start_date: Date;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column('integer')
  amount: number;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Reserve;
