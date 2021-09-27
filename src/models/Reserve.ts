import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Table from './Table';

@Entity('reserves')
class Reserve {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  table_id: string;

  @Column('date')
  start_date: Date;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column('integer')
  amount: number;

  @ManyToOne(() => Table, { eager: true })
  table: Table;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Reserve;
